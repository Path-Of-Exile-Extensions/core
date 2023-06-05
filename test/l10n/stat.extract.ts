import {describe, expect, it} from "vitest";
import {Stat} from "../../src/l10n";

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
