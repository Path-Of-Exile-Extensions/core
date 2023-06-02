export namespace Stat {
  export namespace Is {
    /**
     * 判断是否存在 '+#%' # 为占位符 存在几个返回几个, 否则返回 0
     * @example
     * 输入: "+#% Chance to Block Attack Damage while wielding a Staff"
     * 输出: 1
     *
     * @param stat
     * @constructor
     */
    export function AddSomePercentage(stat: string) {
      const re = /\+#%/g;
      const matches = stat.match(re);
      if (matches) {
        return matches.length;
      } else {
        return 0;
      }
    }

    /**
     * 判断是否存在 '#%' # 为占位符 存在几个返回几个, 否则返回 0
     * @example
     * 输入: "Enemies Hindered by you have #% increased Life Regeneration rate"
     * 输出: 1
     *
     * @param stat
     * @constructor
     */
    export function SomePercentage(stat: string) {
      const re = /#%/g;
      const matches = stat.match(re);
      if (matches) {
        return matches.length;
      } else {
        return 0;
      }
    }


    /**
     * 判断是否存在 '#' # 为字符串
     * @example
     * 输入: "Has # Abyssal Sockets"
     * 输出: 1
     *
     * 输入: "Adds # to # Physical Damage against Poisoned Enemies"
     * 输出: 2
     *
     * @param stat
     * @constructor
     */
    export function Some(stat: string) {
      const re = /#/g;
      const matches = stat.match(re);
      if (matches) {
        return matches.length;
      } else {
        return 0;
      }
    }

  }

  export namespace Extract {
    /**
     * 输入
     * 参数1: "+18% Chance to Block Attack Damage while wielding a Staff"
     * 输出: [18]
     *
     * @param statWithContent
     * @return string[]
     */
    export function AddSomePercentage(statWithContent: string) {
      const re = /\+(\d+)%/g;
      const matches = statWithContent.match(re);
      if (matches) {
        return matches.map((match) => match.replace("+", "").replace("%", ""));
      } else {
        return [];
      }
    }

    /**
     * 输入
     * 参数1: "18% Chance to Block Attack Damage while wielding a Staff"
     * 输出: [18]
     *
     * @param statWithContent
     * @return string[]
     */
    export function SomePercentage(statWithContent: string) {
      const re = /(\d+)%/g;
      const matches = statWithContent.match(re);
      if (matches) {
        return matches.map((match) => match.replace("%", ""));
      } else {
        return [];
      }
    }

    /**
     * 先从参数 2 匹配 # 的位置, 然后从参数 1 中取出对应位置的值
     *
     * 输入
     * 参数1: "Has 2 Abyssal Sockets"
     * 参数2: "Has # Abyssal Sockets"
     * 输出: ['2']
     * 参数1: "10 to 20 Added Spell Lightning Damage while wielding a Two Handed Weapon"
     * 参数2: "# to # Added Spell Lightning Damage while wielding a Two Handed Weapon"
     * 输出: ['10', '20']
     *
     * @param statWithContent
     * @param stat
     * @return string[]
     */
    export function Some(statWithContent: string, stat: string) {
      const re = /#/g;
      const matches = stat.match(re);
      if (matches) {
        const values: string[] = [];
        const parts1 = statWithContent.split(' ');
        const parts2 = stat.split(' ');
        for (let i = 0; i < parts1.length; i++) {
          if (parts2[i] === '#') {
            values.push(parts1[i]);
          }
        }
        return values;
      } else {
        return [];
      }
    }
  }

  export namespace Replace {
    /**
     * 替换 '+x%' x 为数字
     * @example
     * 输入
     * 参数1: [18]
     * 参数2: "持长杖时攻击伤害格挡几率 +#%"
     *
     * 输出: "持长杖时攻击伤害格挡几率 +18%"
     *
     * @example
     * 输入
     * 参数1: [18, 30]
     * 参数2: "斧类攻击附加 +#% 到 +#% 点冰霜伤害"
     *
     * 输出: "斧类攻击附加 +18% 到 +30% 点冰霜伤害"
     *
     * @param contents - string[]
     * @param statWithLang - string
     *
     * @return string
     */
    export function AddSomePercentage(contents: string[], statWithLang: string) {
      let result = statWithLang;
      for (const content of contents) {
        result = result.replace("#", content);
      }
      return result;
    }

    /**
     *
     * @example
     * 输入
     * 参数2: [18]
     * 参数1: "#% Chance to Block Attack Damage while wielding a Staff"
     * 输出: "18% Chance to Block Attack Damage while wielding a Staff"
     *
     * @example
     * 输入
     * 参数1: [18, 30]
     * 参数2: "增加 #% 到 #% 点冰霜伤害"
     * 输出: "增加 18% 到 30% 点冰霜伤害"
     *
     *
     * @param contents: string[]
     * @param statWithLang: string
     *
     * @return string
     */
    export function SomePercentage(contents: string[], statWithLang: string) {
      let result = statWithLang;
      for (const content of contents) {
        result = result.replace("#", content);
      }
      return result;
    }

    /**
     *
     * @example
     * 输入
     * 参数2: [18]
     * 参数1: "# Chance to Block Attack Damage while wielding a Staff"
     * 输出: "18 Chance to Block Attack Damage while wielding a Staff"
     *
     * @example
     * 输入
     * 参数1: [18, 30]
     * 参数2: "增加 # 到 # 点冰霜伤害"
     * 输出: "增加 18 到 30 点冰霜伤害"
     *
     *
     * @param contents: string[]
     * @param statWithLang: string
     *
     * @return string
     */
    export function Some(contents: string[], statWithLang: string) {
      let result = statWithLang;
      for (const content of contents) {
        result = result.replace("#", content);
      }
      return result;
    }

  }

  /**
   * 清除掉括号内的数据
   * @example
   * 输入: ["持长杖时攻击伤害格挡几率 #% (长杖)", "#% Chance to Block Attack Damage while wielding a Staff (Staves)"]
   * 输出: ["持长杖时攻击伤害格挡几率 #%", "#% Chance to Block Attack Damage while wielding a Staff"]
   * 它的逻辑是如果输入的字符串组中都有 (), 并且 () 内都有内容, 那么就把 () 和 () 内的内容清除掉
   *
   * @param refs - string[]
   * @returns string[]
   */
  export function clearParentheses(refs: string[]): string[] {
    // 先判断是否都存在 (), 如果存在则记录它的位置[startIndex, endIndex]
    const indexes: number[][] = [];
    for (let i = 0; i < refs.length; i++) {
      const ref = refs[i];
      const startIndex = ref.indexOf("(");
      const endIndex = ref.indexOf(")");
      if (startIndex !== -1 && endIndex !== -1) {
        indexes.push([startIndex, endIndex]);
      }
    }
    // 清除掉 () 和 () 内的内容
    if (indexes.length === refs.length) {
      const result: string[] = [];
      for (let i = 0; i < refs.length; i++) {
        const ref = refs[i];
        const [startIndex, endIndex] = indexes[i];
        const str = ref.slice(0, startIndex) + ref.slice(endIndex + 1);
        result.push(str);
      }
      return result;
    }
    return refs;
  }

  /**
   * 这个函数的作用就是把 statWithContent 中的内容填充到 statWithLang 中
   * 把 Is, Extract, Replace 这些函数组合起来
   * @param statWithContent - 填充了内容的 stat
   * @param statWithLang - 指定语言的 stat
   * @param stat - 原始语言的 stat
   */
  export function replace(statWithContent: string, statWithLang: string, stat: string) {
    if (Is.AddSomePercentage(stat)) {
      return Replace.AddSomePercentage(Extract.AddSomePercentage(statWithContent), statWithLang);
    }
    if (Is.SomePercentage(stat)) {
      return Replace.SomePercentage(Extract.SomePercentage(statWithContent), statWithLang);
    }
    if (Is.Some(stat)) {
      return Replace.Some(Extract.Some(statWithContent, stat), statWithLang);
    }
    return statWithLang;
  }

  /**
   * 这个函数的作用就是把 statWithContent 中的内容填充到 statWithLang 中
   * 和 replace 的区别是这个函数是模糊匹配的, 所以它传入的参数可能是
   * Base duration is 3.00 seconds
   * 70% more Damage with Bleeding while in Blood Stance
   * +2% to Critical Strike Multiplier
   * 最终要得到
   *
   *
   * @param statWithContent - 填充了内容的 stat
   * @param statWithLang - 指定语言的 stat
   */
  export function replaceFuzzy() {

  }
}
