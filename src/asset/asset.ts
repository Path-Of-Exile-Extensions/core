// 字面量原始呈现方式
export enum LiteralPresentationMode {
  // 直接可以被看到的文本元素, 例如 Type Filter, Search Listed Items
  Text = 1,
  // 不能被直接看到, 但是鼠标移动上去可以看到的信息, 例如 Armour Filters 的 Armour 鼠标移动上去可以看到详情
  Tooltip = 2,
  // 不能被直接看到, 用来填充 Input(Select) 的 placeholder
  Placeholder = 4,
  // 不能被直接看到, 但是可以通过 Input 触发
  SelectOption = 8,
}

// 本地化字面量呈现方式, 用枚举的意义在于减少文本传输量
export enum LiteralLocalizedPresentationViewMode {
  // 替换
  Replacement = 1,
  // tooltip
  Tooltip = 2,
}

// 本地化字面量呈现方式字面量
export enum LiteralLocalizedPresentationViewModeLiteral {
  // 替换
  Replacement = "Replacement",
  // tooltip
  Tooltip = "Tooltip",
}

export enum LiteralKind {
  // 通用
  General = 1,
  // 物品
  Item = 2,
  // 统计数据
  Stat = 4,
}

export enum AssetLocalizedPresentationTiming {
  // 默认
  Default = 0,
  // 当元素改变
  WhenElementChanged = 1,
}

export interface Asset {
  /**
   * 原始字符串, 我称他为 "字面量", 即未加工之前的值
   */
  literal: string;
  literalKind: LiteralKind;
  /**
   * DOM 元素的选择器
   * 如果 presentation 为 text，则为文本元素
   * 如果 presentation 为 popup，则为鼠标移动上去后的触发元素
   * 如果 presentation 为 placeholder，则为 Input 元素
   * 如果 presentation 为 selectOption，则为 Select 元素
   */
  elCSSSelector: string;
  /**
   * DOM 的父级 ID, 使用 AssetModel.getAssetId(asset) 获取
   * 如果 presentation 为 popup，则为鼠标移动上去后的触发元素
   * 如果 presentation 为 placeholder，则为 Input 元素
   * 如果 presentation 为 selectOption，则为 Select 元素
   */
  elParentId?: string;
  // 原始字面量呈现方式
  presentationMode: LiteralPresentationMode;
  // 本地化后可呈现方式
  localizedPresentations: LiteralLocalizedPresentationViewMode[];
  // 本地化的时机
  localizedPresentationTiming: AssetLocalizedPresentationTiming;
  /**
   * literal 是否包含子 dom 元素, 为了节省文件体积, 这个属性仅会在 true 时才会被序列化
   * 例如
   * <div class="filter-title">
   *             Armour
   * <div class="filter-tip"><p>Includes base value, local modifiers, and maximum quality</p></div>
   * </div>
   * literal 为 Armour, Armour 之后的 div 为子 dom 元素, 这种需要特殊处理下
   */
  corrupted?: true;
  // 关联 dom 元素, 不会被序列化, 仅用于调试
  elInspect?: HTMLElement;
}

export type AssetRecord = Record<string, Asset>;

export interface AssetLinkList {
  asset: Asset;
  parent: AssetLinkList | undefined;
}
