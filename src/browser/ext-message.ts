export interface ExtMessage<T = any> {
  identify: BuiltInExtMessageIdentities | string
  payload?: T,
  tabId?: any,
  messageId?: string,
}

export namespace ExtMessage {
  export const is = (message: unknown): message is ExtMessage => {
    if (!message) {
      return false;
    }
    if (typeof message !== "object") {
      return false;
    }
    if (!("identify" in message)) {
      return false;
    }
    return true;
  }
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
  None,
  // 从 1, 可以避免 if(direction) 判断时， Runtime 为 0(被隐式转换为 false)的情况， 降低心智负担
  Runtime = 1,
  Tab
}

export enum BuiltInExtMessageIdentities {
  // ContentScript 注入完成
  ContentScriptReady = "ContentScriptReady",
}

export enum ExtMessagePortID {
  ContentScript = "ContentScript",
  Popup = "Popup",
  Runtime = "Runtime",
}
