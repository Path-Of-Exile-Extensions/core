export namespace TradeFetchTypes {
  export interface Root {
    result: Result[]
  }

  export interface Result {
    id: string
    listing: Listing
    item: Item
  }

  export interface Listing {
    method: string
    indexed: string
    stash: Stash
    whisper: string
    whisper_token: string
    account: Account
    price: Price
  }

  export interface Stash {
    name: string
    x: number
    y: number
  }

  export interface Account {
    name: string
    online: Online
    lastCharacterName: string
    language: string
    realm: string
  }

  export interface Online {
    league: string
  }

  export interface Price {
    type: string
    amount: number
    currency: string
  }

  export interface Item {
    verified: boolean
    w: number
    h: number
    icon: string
    league: string
    id: string
    sockets?: Socket[]
    name: string
    typeLine: string
    baseType: string
    identified: boolean
    ilvl: number
    note?: string
    properties?: Property[]
    requirements?: Requirement[]
    explicitMods: string[]
    flavourText?: string[]
    frameType: number
    extended: Extended
    implicitMods?: string[]
    descrText?: string
    support?: boolean
    corrupted?: boolean
    additionalProperties?: AdditionalProperty[]
    secDescrText?: string
    hybrid?: Hybrid
  }

  export interface Socket {
    group: number
    attr: string
    sColour: string
  }

  export interface Property {
    name: string
    values: [string, number][]
    displayMode: number
    type?: number
  }

  export interface Requirement {
    name: string
    values: [string, number][]
    displayMode: number
    type: number
  }

  export interface Extended {
    base_defence_percentile?: number
    ar?: number
    ar_aug?: boolean
    mods?: Mods
    hashes?: Hashes
    text: string
    dps?: number
    pdps?: number
    edps?: number
    dps_aug?: boolean
    pdps_aug?: boolean
  }

  export interface Mods {
    explicit: Explicit[]
    implicit?: Implicit[]
  }

  export interface Explicit {
    name: string
    tier: string
    level: number
    magnitudes: Magnitude[]
  }

  export interface Magnitude {
    hash: string
    min: number
    max: number
  }

  export interface Implicit {
    name: string
    tier: string
    level: number
    magnitudes: Magnitude2[]
  }

  export interface Magnitude2 {
    hash: string
    min: number
    max: number
  }

  export interface Hashes {
    explicit: [string, number[]][]
    implicit?: [string, number[]][]
  }

  export interface AdditionalProperty {
    name: string
    values: [string, number][]
    displayMode: number
    progress: number
    type: number
  }

  export interface Hybrid {
    isVaalGem: boolean
    baseTypeName: string
    properties: Property2[]
    explicitMods: string[]
    secDescrText: string
  }

  export interface Property2 {
    name: string
    values: [string, number][]
    displayMode: number
  }

}
