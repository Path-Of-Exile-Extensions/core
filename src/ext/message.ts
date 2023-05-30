import {ExtMessage, ExtMessageDirections, ExtMessagePortID} from "./ext-message";
import {uniqId} from "../atom";
import browser from "webextension-polyfill";

const runtimePorts = new Map<string, browser.Runtime.Port>()

type PortMessageCallback = (message: ExtMessage, port: browser.Runtime.Port) => void;
type PortX = string | browser.Runtime.Port

export namespace MessageModule {
  export namespace to {
    // 多播
    export const multicast = (message: ExtMessage) => {
      if (get(ExtMessagePortID.ContentScript, ExtMessageDirections.Runtime)) {
        runtime(get(ExtMessagePortID.ContentScript, ExtMessageDirections.Runtime)!, message)
      }
      if (get(ExtMessagePortID.Popup, ExtMessageDirections.Runtime)) {
        runtime(get(ExtMessagePortID.Popup, ExtMessageDirections.Runtime)!, message)
      }
    }
    export const runtime = (portId: PortX, message: ExtMessage) => {
      const port = typeof portId === "object" ? portId : get(portId, ExtMessageDirections.Runtime)
      port.postMessage(message)
    }
    export const runtime$ = (portId: PortX, message: ExtMessage, timeout = 10000) => {
      return new Promise((resolve, reject) => {
        const port = typeof portId === "object" ? portId : get(portId, ExtMessageDirections.Runtime)
        const _message: ExtMessage = {...message}
        _message.messageId = _message.messageId || uniqId()
        console.log("准备发送消息 $", {..._message}, port.name, runtimePorts)
        setTimeout(() => {
          // 太长时间没有响应， 检查 port 是否已经断开
          reject({errMsg: "Too long time no response, the Port may be disconnected", _message})
        }, timeout)

        const fn: PortMessageCallback = (receiveMessage) => {
          console.log("收到消息 $", {...receiveMessage}, {..._message})
          console.log("收到消息 $ 1", !!receiveMessage.identify)
          console.log("收到消息 $ 2", ExtMessage.isRes(receiveMessage))
          console.log("收到消息 $ 3", _message.messageId === receiveMessage.messageId)
          if (receiveMessage.identify && ExtMessage.isRes(receiveMessage) && _message.messageId === receiveMessage.messageId) {
            resolve(receiveMessage.payload)
            // port.onMessage.removeListener(fn)
          }
        }
        port.onMessage.addListener(fn)
        port.postMessage(_message)
      })
    }
  }
  export namespace addListener {
    export const message = (portId: PortX, _direction: ExtMessageDirections, callback: PortMessageCallback) => {
      const port: browser.Runtime.Port = typeof portId === "object" ? portId : MessageModule.get(portId, ExtMessageDirections.Runtime)
      return port.onMessage.addListener((message: ExtMessage, port) => {
        if (message.identify && ExtMessage.isRes(message)) {
          return
        }
        if (message.identify && ExtMessage.isReq(message)) {
          message = ExtMessage.removeReqPrefix(message)
        }
        callback(message, port)
      })
    }
    export const message$ = (port: browser.Runtime.Port, _direction: ExtMessageDirections, callback: (message: ExtMessage, port: browser.Runtime.Port) => (Promise<unknown> | unknown | undefined | void)) => {
      const handle = async (_message: ExtMessage, _port: browser.Runtime.Port) => {
        if (_message.identify && ExtMessage.isReq(_message)) {
          _message = ExtMessage.removeReqPrefix(_message)
          const result = await Promise.resolve(callback(_message, _port))
          if (result != null) {
            _message.payload = result
            port.postMessage(ExtMessage.toRes(_message))
            // port.onMessage.removeListener(handle)
          }
        }
      }

      return port.onMessage.addListener(handle)
    }

    export const connect = (callback: (port: browser.Runtime.Port) => void) => {
      return browser.runtime.onConnect.addListener(callback);
    }
  }
  export const disconnect = (portId: string, direction: ExtMessageDirections) => {
    if (direction === ExtMessageDirections.Runtime) {
      if (runtimePorts.has(portId)) {
        runtimePorts.get(portId)!.disconnect()
        runtimePorts.delete(portId)
      }
    }
  }
  export const connect = (portId: string, direction: ExtMessageDirections): browser.Runtime.Port => {
    if (direction === ExtMessageDirections.Runtime) {
      if (runtimePorts.has(portId)) {
        throw new Error(`Port ${portId} already exists`)
      }
      const port = browser.runtime.connect({name: portId});
      runtimePorts.set(portId, port)
      return port!
    }
    throw new Error("Invalid direction")
  }
  export const get = (portId: string, direction: ExtMessageDirections): browser.Runtime.Port => {
    if (runtimePorts.get(portId)) {
      return runtimePorts.get(portId)!
    }
    throw new Error(`Port ${portId} not exists`)
    if (direction === ExtMessageDirections.Runtime) {
      return runtimePorts.get(portId)!
    }
    throw new Error("Invalid direction")
  }
  export const put = (portId: string, port: browser.Runtime.Port) => {
    if (runtimePorts.has(portId)) {
      runtimePorts.set(portId, port)
      console.warn(`Port ${portId} already exists, will be replaced`)
      return
    }
    runtimePorts.set(portId, port)
  }
  export namespace client {
    export const connect = (port: ExtMessagePortID) => {
      return
    }
  }
  export namespace server {

  }
}
