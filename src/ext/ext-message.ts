export interface ExtMessage<T = any> {
  identify: BuiltInExtMessageIdentities | string
  payload?: T
}

export enum ExtMessageDirections {
  "Runtime",
  "Tab"
}

export enum BuiltInExtMessageIdentities {
  LocalChanged = "LocalChanged",
}
