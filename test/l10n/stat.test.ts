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

describe("stat.clearParentheses", () => {
  it('无事发生', () => {
    expect([])
      .eq([])
  });
})

describe("stat.Is", () => {
  describe("AddSomePercentage", () => {
    it('0', () => {
      expect(Stat.Is.AddSomePercentage("+is% Chance to Block Attack Damage while wielding a Staff"))
        .eq(0)
    });
    it('1', () => {
      expect(Stat.Is.AddSomePercentage("+#% Chance to Block Attack Damage while wielding a Staff"))
        .eq(1)
    });
  })
  describe("SomePercentage", () => {
    it('0', () => {
      expect(Stat.Is.SomePercentage("World World World"))
        .eq(0)
    });
    it('1', () => {
      expect(Stat.Is.SomePercentage("Enemies Hindered by you have #% increased Life Regeneration rate"))
        .eq(1)
    });
  })

  describe("Some", () => {
    it('0', () => {
      expect(Stat.Is.Some("World World World"))
        .eq(0)
    });
    it('1', () => {
      expect(Stat.Is.Some("# to Level of Socketed Trap Gems"))
        .eq(1)
    });
    it('2', () => {
      expect(Stat.Is.Some("Adds # to # Physical Damage against Poisoned Enemies"))
        .eq(2)
    });
  })
})

describe("stat.Extract", () => {
  describe("AddSomePercentage", () => {
    it('0', () => {
      expect(Stat.Extract.AddSomePercentage("World World World"))
        .toEqual([])
    });
    it('1', () => {
      expect(Stat.Extract.AddSomePercentage(
        "+18% Chance to Block Attack Damage while wielding a Staff"
      ))
        .toEqual(['18'])
    });
    it('2', () => {
      expect(Stat.Extract.AddSomePercentage(
        "如果你在过去10秒内施放过衰弱，则 +20% 暴击伤害加成 +30% 攻击和施法速度"
      ))
        .toEqual(['20', '30'])
    });
  })

  describe("SomePercentage", () => {
    it('0', () => {
      expect(Stat.Extract.SomePercentage(
        "World World World"
      ))
        .toEqual([])
    });

    it('1', () => {
      expect(Stat.Extract.SomePercentage(
        "Enemies Hindered by you have 20% increased Life Regeneration rate"
      ))
        .toEqual(['20'])
    });

    it('2', () => {
      expect(Stat.Extract.SomePercentage(
        "Enemies Hindered by you have 20% increased Life Regeneration rate And 25% increased Movement Speed"
      ))
        .toEqual(['20', '25'])
    });
  })

  describe("Some", () => {
    it('0', () => {
      expect(Stat.Extract.Some(
        "World World World",
        "World World World",
      ))
        .toEqual([])
    })
    it('1', () => {
      expect(Stat.Extract.Some(
        "Has 2 Abyssal Sockets",
        "Has # Abyssal Sockets",
      ))
        .toEqual(['2'])
    })
    it('2', () => {
      expect(Stat.Extract.Some(
        "10 to 20 Added Spell Lightning Damage while wielding a Two Handed Weapon",
        "# to # Added Spell Lightning Damage while wielding a Two Handed Weapon",
      ))
        .toEqual(['10', '20'])
    })
  })

})

describe("stat.Replace", () => {
  describe("AddSomePercentage", () => {
    it('0', () => {
      expect(Stat.Replace.AddSomePercentage([], "World World World"))
        .eq("World World World")
    });
    it('1', () => {
      expect(Stat.Replace.AddSomePercentage(
        ["18"], "持长杖时攻击伤害格挡几率 +#%"
      ))
        .eq('持长杖时攻击伤害格挡几率 +18%')
    });
    it('2', () => {
      expect(Stat.Replace.AddSomePercentage(
        ["20", "30"], "斧类攻击附加 +#% 到 +#% 点冰霜伤害"
      ))
        .eq("斧类攻击附加 +20% 到 +30% 点冰霜伤害")
    });
  })

  describe("SomePercentage", () => {
    it('0', () => {
      expect(Stat.Replace.SomePercentage([], "World World World"))
        .eq("World World World")
    });

    it('1', () => {
      expect(Stat.Replace.SomePercentage(["18"], "持长杖时攻击伤害格挡几率 #%"))
        .eq("持长杖时攻击伤害格挡几率 18%")
    });

    it('2', () => {
      expect(Stat.Replace.SomePercentage(["20", "30"], "斧类攻击附加 #% 到 #% 点冰霜伤害"))
        .eq("斧类攻击附加 20% 到 30% 点冰霜伤害")
    });

  })

  describe("Some", () => {
    it('0', () => {
      expect(Stat.Replace.Some([], "World World World"))
        .eq("World World World")
    });

    it('1', () => {
      expect(Stat.Replace.Some(["18"], "持长杖时攻击伤害格挡几率 #"))
        .eq("持长杖时攻击伤害格挡几率 18")
    });

    it('2', () => {
      expect(Stat.Replace.Some(["20", "30"], "斧类攻击附加 # 到 # 点冰霜伤害"))
        .eq("斧类攻击附加 20 到 30 点冰霜伤害")
    });

  })


})
