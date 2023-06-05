import {describe, expect, it} from "vitest";
import {Stat} from "../../src/l10n";

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
