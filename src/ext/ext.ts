import browser from "webextension-polyfill";
import {ExtMessage, ExtMessage$, ExtMessageDirections} from "./ext-message";
import {uniqId} from "../atom";

const getCurrentTab = async () => {
  return browser.tabs.query({active: true, currentWindow: true})
    .then(tabs => {
      if (tabs.length > 0) {
        return tabs[0];
      }
      return Promise.reject("No active tab identified.")
    });
}

const getCurrentTabs = async () => {
  return browser.tabs.query({active: true, currentWindow: true})
}

const runtimePorts = new Map<string, browser.Runtime.Port>()
// tabId, browser.Runtime.Port
const tabPorts = new Map<string, [number, browser.Runtime.Port]>()

type MessageCallback = (message: ExtMessage, sender: browser.Runtime.MessageSender) => (Promise<any> | undefined | void);


async function onMessageEffect(callback: MessageCallback, message: ExtMessage, sender: browser.Runtime.MessageSender) {
  // console.log("onMessageEffect", message)
  message = ExtMessage.removeReqPrefix(message);
  // console.log("onMessageEffect removeReqPrefix", message)
  const result = await Promise.resolve(callback(ExtMessage.removeReqPrefix(message), sender))
  // console.log("onMessageEffect result", message, result)
  // 如果存在结果就发出一个响应的消息
  // 不是 null 或者 undefined 就是合法的结果
  if (result != null && message.resDirection) {
    const resMessage = {
      ...ExtMessage.toRes(message),
      payload: await result,
      direction: message.resDirection!,
    }
    Ext.send.message(resMessage)
  }

  return Promise.resolve();
}

export namespace Ext {
  export namespace MessageNT {
    export const toRuntime = (uniqueId: string, message: ExtMessage) => {
      const port = connect(uniqueId, ExtMessageDirections.Runtime)
      port.postMessage(message)
    }
    export const onMessage = (uniqueId: string, _direction: ExtMessageDirections) => {
      const port: browser.Runtime.Port = connect(uniqueId, ExtMessageDirections.Runtime)
      return port.onMessage.addListener()
    }
    export const onConnect = (callback: (port: browser.Runtime.Port) => void) => {
      return browser.runtime.onConnect.addListener(callback);
    }
    export const disconnect = (uniqueId: string, direction: ExtMessageDirections) => {
      if (direction === ExtMessageDirections.Runtime) {
        if (runtimePorts.has(uniqueId)) {
          runtimePorts.get(uniqueId)!.disconnect()
          runtimePorts.delete(uniqueId)
        }
      }
    }
    export const connect = (uniqueId: string, direction: ExtMessageDirections): browser.Runtime.Port => {
      if (direction === ExtMessageDirections.Runtime) {
        if (!runtimePorts.has(uniqueId)) {
          runtimePorts.set(uniqueId, browser.runtime.connect({name: uniqueId}))
        }
        return runtimePorts.get(uniqueId)!
      }
      throw new Error("Invalid direction")
    }
  }
}

export const Ext = {
  get: {
    url(): Promise<string> {
      if (location.href.startsWith("http")) {
        return Promise.resolve(location.href);
      }
      return getCurrentTab().then(tab => tab.url!)
    },
    currentTab: getCurrentTab,
  },
  local: {
    async get(key: string) {
      const data = (await browser.storage.local.get(key));
      if (data[key] && typeof data[key] === "string") {
        return JSON.parse(data[key])
      }
      return data;
    },
    async set(key: string, value: any) {
      if (typeof value === "object") {
        value = JSON.stringify(value)
      }
      await browser.storage.local.set({[key]: value})
      return Promise.resolve();
    },
    clear() {
      return browser.storage.local.clear();
    }
  },
  on: {
    message(callback: MessageCallback) {
      return browser.runtime.onMessage.addListener(async (message: ExtMessage, sender) => {
        if (!message || message.identify) {
          return
        }
        // 不要处理 Promise 化的 message
        if (ExtMessage$.isReq(message)) {
          return;
        }
        // 不要处理 Promise 化的 message
        if (ExtMessage$.isRes(message)) {
          return;
        }
        // 不要处理 Message res
        if (ExtMessage.isRes(message)) {
          return;
        }

        if (!ExtMessage.isReq(message)) {
          throw new Error(`Message is not a request. messageId = ${message.identify}`);
        }
        await onMessageEffect(callback, message, sender);
        return true;
      });
    },
    response(callback: MessageCallback): void {
      return browser.runtime.onMessage.addListener((message: ExtMessage, sender) => {
        if (ExtMessage.isRes(message)) {
          callback(ExtMessage.removeResPrefix(message), sender)
        }
        return true;
      })
    },
    async tabMessage$(callback: (message: ExtMessage$) => unknown): Promise<any> {
      browser.runtime.onMessage.addListener(async (message: ExtMessage$) => {
        if (!ExtMessage$.isReq(message)) {
          return;
        }
        message = ExtMessage$.removeReqPrefix(message);
        let result = await Promise.resolve(callback(message));
        message.payload = result;
        message = ExtMessage$.toRes(message);
        getCurrentTabs()
          .then(tabs => {
            tabs.forEach(tab => {
              browser.tabs.sendMessage(tab.id!, message)
            })
          })
        return true;
      })
    },
  },
  send: {
    /**
     * 从 tab 向 runtime 发送消息, 支持 promise 调用
     */
    async toRuntime$(message: ExtMessage$, timeout: number = 10000): Promise<unknown> {
      return new Promise(async (resolve, reject) => {
        setTimeout(() => {
          reject({msg: "message over time.", result: message})
        }, timeout)
        message = ExtMessage$.toReq(message);
        message.uniqId = message.uniqId || uniqId();
        browser.runtime.onMessage.addListener((_message: ExtMessage$) => {
          if (ExtMessage$.isRes(_message) && _message.uniqId === message.uniqId) {
            resolve(_message.payload)
            return;
          }
          return;
        })

        browser.runtime.sendMessage(message)
      })
    },
    // 多播
    async multicast(message: ExtMessage) {
      return Promise.all([
        Ext.send.message({
          ...message,
          direction: ExtMessageDirections.Runtime,
        }),
        Ext.send.message({
          ...message,
          direction: ExtMessageDirections.Tab,
        })
      ])
    },
    async message(message: ExtMessage): Promise<any> {
      if (!ExtMessage.isRes(message)) {
        message = ExtMessage.toReq(message);
      }
      switch (message.direction) {
        case ExtMessageDirections.Runtime:
          return browser.runtime.sendMessage(message)
        case ExtMessageDirections.Tab:
          message.tabId = message.tabId || (await getCurrentTab()).id;
          if (!message.tabId) {
            return Promise.reject("No tabId identified.")
          }
          return browser.tabs.sendMessage(message.tabId, message);
        default:
          throw new Error("Unknown message direction.");
      }
    },
  },
  reload: {
    async tabs() {
      return browser.tabs.reload((await getCurrentTab()).id)
    },
    async runtime() {
      return browser.runtime.reload();
    }
  }
}
