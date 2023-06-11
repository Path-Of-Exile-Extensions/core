import {Magnitude} from "./magnitude";

export interface BaseTypeEntity {
  // 目标语言的名称
  name: string;
  // 源语言的名称
  name_: string;
  // 描述
  secDescrText: string;
  // 描述
  secDescrText_: string;
  // 源语言
  primitiveLanguage: string;
}

export interface BaseStatEntity {
  // 目标语言的 Stat
  name: string;
  // 源语言的 Stat
  name_: string;
  // 源语言名称
  refName: string;
  // 如果不存在， 则在序列化时被丢弃, 如果存在， 则至少有一个元素
  magnitudes: Magnitude[] | undefined
  // 源语言
  primitiveLanguage: string;
}
