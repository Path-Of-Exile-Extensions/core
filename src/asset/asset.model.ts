import {Asset, LiteralLocalizedPresentationViewMode, LiteralPresentationMode} from "./asset";
import {AssetVendor} from "./asset-vendor";

// 本地化字面量可呈现方式
export const LiteralLocalizedPresentationMode = {
  [LiteralPresentationMode.Text]: LiteralLocalizedPresentationViewMode.Replacement | LiteralLocalizedPresentationViewMode.Tooltip,
  [LiteralPresentationMode.Tooltip]: LiteralLocalizedPresentationViewMode.Replacement,
  [LiteralPresentationMode.Placeholder]: LiteralLocalizedPresentationViewMode.Replacement | LiteralLocalizedPresentationViewMode.Tooltip,
  [LiteralPresentationMode.SelectOption]: LiteralLocalizedPresentationViewMode.Replacement,
} as const;

export class AssetModel {

  /**
   * 获取资产的本地化字面量可呈现的方式
   * @param asset
   */
  public static getLiteralLocalizedPresentationMode(asset: Asset) {
    return LiteralLocalizedPresentationMode[asset.presentationMode];
  }

  /**
   * 获取资产的本地化字面量可呈现方式的可读形式
   * @param asset
   */
  public static getLiteralLocalizedPresentationModeReadable(asset: Asset) {
    const mode = this.getLiteralLocalizedPresentationMode(asset);
    const readable = [];
    if (mode & LiteralLocalizedPresentationViewMode.Replacement) {
      readable.push('Replacement');
    }
    if (mode & LiteralLocalizedPresentationViewMode.Tooltip) {
      readable.push('Tooltip');
    }
    return readable.join(' | ');
  }

  /**
   * 获取一个资产的唯一 ID
   */
  public static getAssetId(asset: Asset) {
    let id: string = "";
    id += asset.literal;
    if (asset.elParentId) {
      id = id + "_" + asset.elParentId;
    }
    return id;
  }

  /**
   * 根据资产的唯一 ID 获取资产
   */
  public static getAssetById(id: string, assets: Asset[]) {
    const [_, parentElCSSSelector] = id.split("_");
    return assets.find(asset => asset.elCSSSelector === parentElCSSSelector);
  }

  /**
   * 使用 Asset 对象创建一个 AssetVendor 对象
   * @param asset
   * @param localizedLiteral
   */
  public static createAssetVendor(asset: Asset, localizedLiteral: string): AssetVendor {
    return {
      ...asset,
      elInspect: undefined,
      localizedLiteral: localizedLiteral,
    };
  }
}
