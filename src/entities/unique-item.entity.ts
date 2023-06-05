/**
 * 传奇物品实体
 */
export type UniqueItemEntity = {
  // 目标语言的物品名称
  name: string;
  // 源语言的物品名称
  name_: string;
  // 目标语言的物品类型
  baseType: string;
  // 源语言
  primitiveLanguage: string;
}
