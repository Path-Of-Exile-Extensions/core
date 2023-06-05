import {Magnitude} from "./magnitude";

/**
 * @example
 * {
 *   "name": "你累计受到 (528–3272) 点伤害时触发被辅助的法术",
 *   "name_": "Trigger Supported Spells when you take a total of (528–3272) Damage",
 *   "gemName": "Cast when Damage Taken Support",
 *   "min": 528,
 *   "max": 3272,
 *   "primitiveLanguage": "en"
 * }
 */
export type GemStatEntity = {
  // 目标语言的 Stat
  name: string;
  // 源语言的 Stat
  name_: string;
  // 源语言技能宝石名称
  gemName: string;
  // 如果不存在， 则在序列化时被丢弃, 如果存在， 则至少有一个元素
  magnitudes: string
  // 源语言
  primitiveLanguage: string;
}

export type GemStatModel = {
  // 目标语言的 Stat
  name: string;
  // 源语言的 Stat
  name_: string;
  // 源语言技能宝石名称
  gemName: string;
  // 如果不存在， 则在序列化时被丢弃, 如果存在， 则至少有一个元素
  magnitudes: Magnitude[] | undefined
  // 源语言
  primitiveLanguage: string;
}
