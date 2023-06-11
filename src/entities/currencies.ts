import {BaseStatEntity, BaseTypeEntity} from "./base";

// export interface OilEntity extends BaseTypeEntity {}
// export interface FossilEntity extends BaseTypeEntity {}
/**
 * 裂片
 */
// export interface SplinterEntity extends BaseTypeEntity {}
/**
 * 魔瓶/坛
 * https://poedb.tw/cn/Vial
 */
// export interface VialEntity extends BaseTypeEntity {}

/**
 * 化石的 Stat，固定一个，本地话时直接替换
 */
export interface FossilStatEntity extends BaseStatEntity {}

/**
 * 祝福
 * https://poedb.tw/cn/Blessing
 */
export interface BlessingEntity extends BaseTypeEntity {}

/**
 * 祝福的 Stat，固定一个，本地话时直接替换
 */
export interface BlessStatEntity extends BaseStatEntity {}
