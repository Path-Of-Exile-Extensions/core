import browser from "webextension-polyfill";
import {ExtMessage, ExtMessageDirections} from "./ext-message";

const getCurrentTab = async () => {
  return browser.tabs.query({active: true, currentWindow: true})
    .then(tabs => {
      if (tabs.length > 0) {
        return tabs[0];
      }
      return Promise.reject("No active tab identified.")
    });
}

type MessageCallback = (message: ExtMessage, sender: browser.Runtime.MessageSender) => (Promise<any> | undefined | void);


async function onMessageEffect(callback: MessageCallback, message: ExtMessage, sender: browser.Runtime.MessageSender) {
  // console.log("onMessageEffect", message)
  message = ExtMessage.removeReqPrefix(message);
  // console.log("onMessageEffect removeReqPrefix", message)
  const result = await Promise.resolve(callback(ExtMessage.removeReqPrefix(message), sender))
  // console.log("onMessageEffect result", message, result)
  // 如果存在结果就发出一个响应的消息
  if (result && message.resDirection) {
    const resMessage = {
      ...ExtMessage.toRes(message),
      payload: await result,
      direction: message.resDirection!,
    }
    console.log("onMessageEffect send message", resMessage)
    Ext.send.message(resMessage)
  }

  return Promise.resolve();
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
        if (ExtMessage.isRes(message)) {
          return true;
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
  },
  send: {
    async message(message: ExtMessage): Promise<any> {
      console.log("ext.ts send message", message)
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
          return browser.tabs.sendMessage(message.tabId || (await getCurrentTab()).id, message);
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
