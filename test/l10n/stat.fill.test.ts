import {describe, expect, it} from "vitest";
import {Stat} from "../../src/l10n";

describe("stat.fill", () => {
  it("应该填充单个 #%", () => {
    expect(
      Stat.replace(
        "Enemies Hindered by you have 20% increased Life Regeneration rate",
        "被你缓速的敌人的生命回复率提高 #%",
        "Enemies Hindered by you have #% increased Life Regeneration rate"
      )
    ).eq("被你缓速的敌人的生命回复率提高 20%")
  });
  it("应该填充单个 +#%", () => {
    // implicit.stat_1001829678
    expect(
      Stat.replace(
        "+18% Chance to Block Attack Damage while wielding a Staff",
        "持长杖时攻击伤害格挡几率 #% (长杖)",
        "#% Chance to Block Attack Damage while wielding a Staff (Staves)"
      )
    ).eq("持长杖时攻击伤害格挡几率 18% (长杖)")
  });
  it("应该填充单个 #", () => {
    expect(
      Stat.replace(
        "Has 2 Abyssal Sockets",
        "有 # 个深渊插槽",
        "Has # Abyssal Sockets"
      )
    ).eq("有 2 个深渊插槽")

    expect(
      Stat.replace(
        "Adds 2 to 10 Cold Damage",
        "附加 # to # 基础冰霜伤害",
        "Adds # to # Cold Damage"
      )
    ).eq("附加 2 to 10 基础冰霜伤害")
  });

})
