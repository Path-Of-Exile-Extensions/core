import browser from "webextension-polyfill";
import {MessageModule} from "./message";

const getCurrentTab = async () => {
  return browser.tabs.query({active: true, currentWindow: true})
    .then(tabs => {
      if (tabs.length > 0) {
        return tabs[0];
      }
      return Promise.reject("No active tab identified.")
    });
}

export namespace Ext {
  export const message = MessageModule

  export namespace get {
    export const url = () => {
      if (location.href.startsWith("http")) {
        return Promise.resolve(location.href);
      }
      return getCurrentTab().then(tab => tab.url!)
    }
    export const currentTab = getCurrentTab
  }

  export namespace local {
    export const get = async (key: string) => {
      const data = (await browser.storage.local.get(key));
      if (data[key] && typeof data[key] === "string") {
        return JSON.parse(data[key])
      }
      return data;
    }
    export const set = async (key: string, value: any) => {
      if (typeof value === "object") {
        value = JSON.stringify(value)
      }
      await browser.storage.local.set({[key]: value})
      return Promise.resolve();
    }
    export const clear = () => {
      return browser.storage.local.clear();
    }
  }

  export namespace reload {
    export async function tabs() {
      return browser.tabs.reload((await getCurrentTab()).id)
    }

    export function runtime() {
      return browser.runtime.reload();
    }
  }

}

