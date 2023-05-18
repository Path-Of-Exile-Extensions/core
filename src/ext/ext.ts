import {BuiltInExtMessageIdentities, ExtMessage, ExtMessageDirections} from "./ext-message";

const getCurrentTabId = async () => {
  return new Promise<number>((resolve, reject) => {
    chrome.tabs.query({active: true, currentWindow: true}, (tabs) => {
      if (tabs.length > 0) {
        resolve(tabs[0].id!);
      } else {
        reject("No active tab identified.");
      }
    });
  });
}

export const Ext = {
  get: {
    url() {
      if (!location.href.startsWith("chrome-extension")) {
        return Promise.resolve(location.href);
      }
      return new Promise((resolve, reject) => {
        chrome.tabs.query({active: true, currentWindow: true}, (tabs) => {
          if (tabs.length > 0) {
            return resolve(tabs[0].url)!;
          }
          reject("No active tab identified.");

          return true;
        })
      })
    },
  },
  local: {
    async get(key: string) {
      const data = (await chrome.storage.local.get(key));
      if (data[key] && typeof data[key] === "string") {
        return JSON.parse(data[key])
      }
      return data;
    },
    async set(key: string, value: any) {
      if (typeof value === "object") {
        value = JSON.stringify(value)
      }
      Ext.send.message(
        {
          identify: BuiltInExtMessageIdentities.LocalChanged,
        },
        ExtMessageDirections.Runtime,
      )
      await chrome.storage.local.set({[key]: value})
      return Promise.resolve();
    },
    clear() {
      Ext.send.message(
        {
          identify: BuiltInExtMessageIdentities.LocalChanged,
        },
        ExtMessageDirections.Runtime,
      )
      return chrome.storage.local.clear();
    }
  },
  on: {
    message(callback: (message: ExtMessage) => void) {
      return chrome.runtime.onMessage.addListener((message) => {
        callback(message)
        return true;
      });
    },
    localChanged(callback: (message: ExtMessage) => void) {
      return Ext.on.message((message) => {
        if (message.identify === BuiltInExtMessageIdentities.LocalChanged) {
          callback(message)
        }
        return true;
      });
    },
  },
  send: {
    async message(message: ExtMessage, direction: ExtMessageDirections) {
      switch (direction) {
        case ExtMessageDirections.Runtime:
          return chrome.runtime.sendMessage(message)
        case ExtMessageDirections.Tab:
          return chrome.tabs.sendMessage(await getCurrentTabId(), message);
      }
    },
  },
  reload: {
    async tabs() {
      return chrome.tabs.reload(await getCurrentTabId())
    },
    async runtime() {
      return chrome.runtime.reload();
    }
  }
}
