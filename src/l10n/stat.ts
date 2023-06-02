export namespace Stat {
  export function findPercentage(str: string) {
    const re = /(\d+)%/g;
    const matches = str.match(re)!;

    const percentages = matches.map((match) => match.replace("%", ""));

    return percentages;
  }

  export function replaceHashes(statWithLange: string, conetnts: string[]) {
    let index = 0;
    return statWithLange.replace(/#/g, () => conetnts[index++]);
  }

  export function getValues(str1: string, str2: string): string[] {
    const values: string[] = [];
    const parts1 = str1.split(' ');
    const parts2 = str2.split(' ');
    for (let i = 0; i < parts1.length; i++) {
      if (parts1[i] === '#') {
        values.push(parts2[i]);
      }
    }
    return values;
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
   * @param statWithContent - 填充了内容的 stat
   * @param statWithLang - 指定语言的 stat
   * @param stat - 原始语言的 stat
   */
  export function fill(statWithContent: string, statWithLang: string, stat: string) {
    let str: string = ""
    if ((/#%/).test(stat)) {
      let a = findPercentage(statWithContent)
      str = replaceHashes(statWithLang, a)
    } else if ((/#/).test(stat)) {
      const conetnts = getValues(stat, statWithContent)
      str = replaceHashes(statWithLang, conetnts)
    }

    return str || statWithContent;
  }
}
