import {describe, expect, it} from "vitest";
import {Stat} from "../../src/l10n";

describe("stat.fill", () => {
  it("应该填充单个 #%", () => {
    expect(
      Stat.fill(
        "Enemies Hindered by you have 20% increased Life Regeneration rate",
        "被你缓速的敌人的生命回复率提高 #%",
        "Enemies Hindered by you have #% increased Life Regeneration rate"
      )
    ).eq("被你缓速的敌人的生命回复率提高 20%")
  });
  it("应该填充单个 #", () => {
    expect(
      Stat.fill(
        "Has 2 Abyssal Sockets",
        "有 # 个深渊插槽",
        "Has # Abyssal Sockets"
      )
    ).eq("有 2 个深渊插槽")

    expect(
      Stat.fill(
        "Adds 2 to 10 Cold Damage",
        "附加 # to # 基础冰霜伤害",
        "Adds # to # Cold Damage"
      )
    ).eq("附加 2 to 10 基础冰霜伤害")

  });

})
