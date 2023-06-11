export enum FrameType {
  /**
   * 普通物品(白装)
   * @example Spiked Gloves
   */
  Normal = 0,
  /**
   * 魔法物品(蓝装)
   * @example Antique Greaves
   */
  Magic = 1,
  /**
   * 稀有物品(黄装)
   */
  Rare = 2,
  /**
   * 唯一物品(暗金)
   */
  Unique = 3,
  /**
   * 技能宝石
   */
  Gem = 4,
  /**
   * 通货
   */
  Currency = 5,
  /**
   * 命运卡
   */
  DivinationCard = 6,
  /**
   * 任务
   * 似乎已经被废弃了
   * @example The Dweller of the Deep
   */
  Quest = 7,
  /**
   * 预言
   * seems to be deprecated
   */
  Prophecy = 8,
  /**
   * 烫金 有钱人的玩具
   * Item Rarity: Unique (Foil)
   * https://www.poewiki.net/wiki/Foil_item
   */
  Foil = 9,
  /**
   * 同上
   */
  SupporterFoil = 10
}
