import {POEItem} from "./poe-item";
import {POEItemEntity} from "./poe-item-entity";

export class PoeItemEntityBuilder {
  static fromStructure(item: Partial<POEItem>) {
    return new POEItemEntity({
        name: item.name!,
        type: item.type!,
      }
    )
  }
}
