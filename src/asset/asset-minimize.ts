import {
  AssetLocalizedPresentationTiming,
  LiteralLocalizedPresentationViewMode,
  LiteralPresentationMode
} from "./asset";
import {AssetVendor} from "./asset-vendor";

export interface AssetVendorMinimize {
  // literal: string;
  l: string;
  // localizedLiteral: string;
  ll: string;
  // elCSSSelector?: string;
  elcs: string;
  // elParentId?: string;
  epi?: string;
  // presentationMode: LiteralPresentationMode;
  pm: LiteralPresentationMode;
  // localizedPresentations: LiteralLocalizedPresentationViewMode[];
  lp: LiteralLocalizedPresentationViewMode[];
  lpt: AssetLocalizedPresentationTiming;
  // corrupted
  c?: true;
}

export class AssetVendorMinimizeModel {
  static mapFrom(assetVendor: AssetVendor): AssetVendorMinimize {
    return {
      l: assetVendor.literal,
      ll: assetVendor.localizedLiteral,
      elcs: assetVendor.elCSSSelector,
      epi: assetVendor.elParentId,
      pm: assetVendor.presentationMode,
      lp: assetVendor.localizedPresentations,
      lpt: assetVendor.localizedPresentationTiming,
      c: assetVendor.corrupted,
    }
  }

  static mapTo(assetVendorMinimize: AssetVendorMinimize): AssetVendor {
    return {
      localizedPresentationTiming: assetVendorMinimize.lpt,
      literal: assetVendorMinimize.l,
      localizedLiteral: assetVendorMinimize.ll,
      elCSSSelector: assetVendorMinimize.elcs,
      elParentId: assetVendorMinimize.epi,
      presentationMode: assetVendorMinimize.pm,
      localizedPresentations: assetVendorMinimize.lp,
      elInspect: undefined,
      corrupted: assetVendorMinimize.c,
    }
  }

  static minimize(assetVendors: Record<string, AssetVendor>): Record<string, AssetVendorMinimize> {
    return Object.keys(assetVendors)
      .reduce((prev, id) => {
        const assetVendor = assetVendors[id]
        return {
          ...prev,
          [id]: this.mapFrom(assetVendor)
        }
      }, {} as Record<string, AssetVendorMinimize>)
  }

  static decode(assetVendorMinimizes: Record<string, AssetVendorMinimize>): Record<string, AssetVendor> {
    return Object.keys(assetVendorMinimizes)
      .reduce((prev, id) => {
        const assetVendorMinimize = assetVendorMinimizes[id]
        return {
          ...prev,
          [id]: this.mapTo(assetVendorMinimize)
        }
      }, {} as Record<string, AssetVendor>)
  }
}
