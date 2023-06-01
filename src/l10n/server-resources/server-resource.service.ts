import {ServerResourceTypes} from "./server-resource-types";

export namespace ServerResourceService {
  export namespace Items {
    export const GetDiscriminators = (items: ServerResourceTypes.Items.Items[]): Record<string, string> => {
      return items.reduce((prev, curr) => {
        if (!curr.entries) {
          return prev
        }
        curr.entries.forEach(item => {
          if (item.disc) {
            prev[item.disc] = item.disc
          }
        })
        return prev
      }, {} as Record<string, string>)
    }
  }
}
