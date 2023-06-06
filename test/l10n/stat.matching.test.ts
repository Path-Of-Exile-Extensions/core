import {describe, expect, it} from "vitest";
import {Stat} from "../../src/l10n";

describe("stat.matching", () => {

  it("test 2", () => {
    expect(
      Stat.matching(
        "Deals 9 - 14 Fire Damage",
        [
          {
            "gemName": "Vaal Fireball",
            "magnitudes": [
              {
                "max": 1095,
                "min": 9
              },
              {
                "max": 1643,
                "min": 14
              }
            ],
            "name": "Deals # to # Fire Damage",
            "name_": "造成 # to # 火焰伤害",
            "primitiveLanguage": "en"
          },
          {
            "gemName": "Vaal Fireball",
            "magnitudes": [
              {
                "max": 32,
                "min": 32
              }
            ],
            "name": "Fires # Projectiles in a spiral",
            "name_": "螺旋发射 # 个投射物",
            "primitiveLanguage": "en"
          },
          {
            "gemName": "Vaal Fireball",
            "magnitudes": [
              {
                "max": 25,
                "min": 25
              }
            ],
            "name": "#% chance to Ignite enemies",
            "name_": "#% 的几率点燃敌人",
            "primitiveLanguage": "en"
          },
          {
            "gemName": "Vaal Fireball",
            "magnitudes": [
              {
                "max": null,
                "min": null
              }
            ],
            "name": "Projectiles gain Radius as they travel farther, up to # Radius",
            "name_": "投射物范围随飞行距离扩大，最大范围 #",
            "primitiveLanguage": "en"
          },
          {
            "gemName": "Vaal Fireball",
            "magnitudes": [
              {
                "max": 20,
                "min": 0
              }
            ],
            "name": "#% increased Projectile Speed",
            "name_": "投射物速度提高 #%",
            "primitiveLanguage": "en"
          }
        ],
      )
    ).toEqual({
      "gemName": "Vaal Fireball",
      "magnitudes": [
        {
          "max": 1095,
          "min": 9
        },
        {
          "max": 1643,
          "min": 14
        }
      ],
      "name": "Deals # to # Fire Damage",
      "name_": "造成 # to # 火焰伤害",
      "primitiveLanguage": "en"
    })
  });

})
