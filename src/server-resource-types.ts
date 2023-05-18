export namespace ServerResourceTypes {

  export namespace Items {
    export type Response = {
      result: Items[]
    }

    export type Items = {
      id: string
      label: string
      entries: Item[]
    }

    export interface Item {
      name?: string
      type: string
      text: string
      flags?: Flags
      disc?: string
    }

    export interface Flags {
      unique: boolean
    }
  }

  export namespace Stats {
    export type Response = {
      result: Stats[]
    }

    export interface Stats {
      id: string
      label: string
      entries: Stat[]
    }

    export interface Stat {
      id: string
      text: string
      type: string
      option?: Option
    }

    export interface Option {
      options: Option2[]
    }

    export interface Option2 {
      id: number
      text: string
    }
  }

  export namespace Static {
    export interface Statics {
      id: string
      label?: string
      entries: Static[]
    }

    export interface Static {
      id: string
      text: string
      image?: string
    }
  }

}
