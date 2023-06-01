import {Asset} from "./asset";

export interface AssetVendor extends Asset {
  /**
   * 被本地化的"字面量", 这里我对它的语义仍然是 "字面量", 因为它仍未加工完成
   * 例如: "Armour" -> "护甲"
   * 例如: "#% to Cold Resistance" -> "#% 冰霜抗性"
   */
  localizedLiteral: string;
  elInspect: undefined;
}
