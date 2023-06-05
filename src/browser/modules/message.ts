import {ExtMessage, ExtMessagePortID} from "../ext-message";
import {uniqId} from "../../atom";
import browser from "webextension-polyfill";
import EventEmitter from "eventemitter3";

type Port = browser.Runtime.Port
type PortMessageCallback = (message: ExtMessage, port: Port) => void;
type PortMessageCallback$<T = any> = (message: ExtMessage, port: Port) => Promise<T>;
/**
 * 事件类型
 * sms:  短信 - 标识这个事件只管发送, 不管回复
 * call: 电话 - 标识这个事件需要回复
 */
type EventTypes = "sms" | "call"
type OffEventListeners = () => void
const portEventEmitter = new Map<Port, EventEmitter<EventTypes>>()
const storePort = (port: Port) => {
  const eventListeners = new EventEmitter<EventTypes>();
  port.onMessage.addListener((message: unknown | ExtMessage, port) => {
    // console.log("ext:message.ts onMessage", message)
    if (!ExtMessage.is(message)) {
      // throw new Error("ext:message.ts message is not ExtMessage")
      return console.warn("ext:message.ts message is not ExtMessage")
    }
    if (ExtMessage.isReq(message)) {
      message = ExtMessage.removeReqPrefix(message)
      eventListeners.emit("call", message, port)
    } else {
      eventListeners.emit("sms", message, port)
    }
  })
  portEventEmitter.set(port, eventListeners)
}

export namespace MessageModule {
  export const connect = (sourceDirection: ExtMessagePortID): Port => {
    let id = ""
    if (sourceDirection === ExtMessagePortID.Runtime) {
      id = ExtMessagePortID.Runtime
    } else if (sourceDirection === ExtMessagePortID.ContentScript) {
      id = ExtMessagePortID.ContentScript
    } else {
      id = ExtMessagePortID.Popup
    }
    id += ":" + uniqId();
    const port = browser.runtime.connect({name: id});
    storePort(port)
    return port;
  }
  export const onConnect = (callback: (port: Port) => void): OffEventListeners => {
    const _callback = (port: Port) => {
      storePort(port)
      callback(port)
    }
    browser.runtime.onConnect.addListener(_callback)
    return () => {
      browser.runtime.onConnect.removeListener(_callback)
    }
  }
  export const disconnect = (port: Port) => {
    port.disconnect()
    portEventEmitter.get(port)!.removeAllListeners()
    portEventEmitter.delete(port)
  }
  export const post = (port: Port, message: ExtMessage) => {
    // console.log("ext:message.ts port", message)
    return port.postMessage(message)
  }
  export const multicast = (ports: Port[], message: ExtMessage) => {
    ports.forEach(port => {
      post(port, message)
    })
  }
  export const post$ = <R = any>(port: Port, message: ExtMessage, timeout = 5000): Promise<R> => {
    // console.log("ext:message.ts port$", message)
    message = ExtMessage.toReq(message)
    message.messageId = message.messageId || uniqId()

    return new Promise((resolve, reject) => {
      setTimeout(() => {
        // 太长时间没有响应， 检查 port 是否已经断开
        reject({errMsg: "Too long time no response, the Port may be disconnected", message})
      }, timeout)

      const off = addListener.message(port, (receiveMessage) => {
        if (ExtMessage.isRes(receiveMessage) && message.messageId === receiveMessage.messageId) {
          resolve(receiveMessage.payload)
          off()
        }
      })
      post(port, message)
    })
  }
  export namespace addListener {
    export const message = (port: Port, callback: PortMessageCallback): OffEventListeners => {
      portEventEmitter.get(port)!.addListener("sms", callback)
      return () => portEventEmitter.get(port)!.removeListener("sms", callback)
    }
    export const message$ = (port: Port, callback: PortMessageCallback$): OffEventListeners => {
      const _callback = async (message: ExtMessage, port: Port) => {
        const result = await callback(message, port)
        if (result == null) {
          throw new Error("ext:message.ts message$ callback should return a valid value")
        }
        let messageResult: ExtMessage = {
          ...message,
          payload: result
        }
        messageResult = ExtMessage.toRes(messageResult)
        post(port, messageResult)
      }
      portEventEmitter.get(port)!.addListener("call", _callback)
      return () => portEventEmitter.get(port)!.removeListener("call", _callback)
    }
  }
  export namespace removeListener {
    export const message = (port: Port, callback: PortMessageCallback) => {
      portEventEmitter.get(port)!.removeListener("sms", callback)
    }
    export const message$ = (port: Port, callback: PortMessageCallback) => {
      portEventEmitter.get(port)!.removeListener("call", callback)
    }
  }
}
