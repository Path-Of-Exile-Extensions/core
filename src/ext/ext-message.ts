export interface ExtMessage<T = any> {
  identify: BuiltInExtMessageIdentities | string
  payload?: T,
  direction: ExtMessageDirections,
  resDirection?: ExtMessageDirections,
  // 如果是 tab 方向，可以指定 tabId, 否则默认为当前 tab
  tabId?: any,
}

export namespace ExtMessage {
  export const isRes = (message: ExtMessage) => {
    return message.identify.startsWith("res:");
  }
  export const isReq = (message: ExtMessage) => {
    return message.identify.startsWith("req:");
  }
  export const removeResPrefix = (message: ExtMessage) => {
    const identify = message.identify.replace("res:", "");
    return {
      ...message,
      identify,
    }
  }
  export const removeReqPrefix = (message: ExtMessage) => {
    const identify = message.identify.replace("req:", "");
    return {
      ...message,
      identify,
    }
  }
  export const toRes = (message: ExtMessage) => {
    return {
      ...message,
      identify: "res:" + message.identify,
    }
  }
  export const toReq = (message: ExtMessage) => {
    return {
      ...message,
      identify: "req:" + message.identify,
    }
  }

}

export enum ExtMessageDirections {
  Runtime,
  Tab
}

export enum BuiltInExtMessageIdentities {
  // ContentScript 注入完成
  ContentScriptReady = "ContentScriptReady",
}
