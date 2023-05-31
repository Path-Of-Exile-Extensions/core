export namespace Stat {
  function findPercentage(str: string) {
    const re = /(\d+)%/g;
    const matches = str.match(re)!;

    const percentages = matches.map((match) => match.replace("%", ""));

    return percentages;
  }

  function replaceHashes(statWithLange: string, conetnts: string[]) {
    let index = 0;
    return statWithLange.replace(/#/g, () => conetnts[index++]);
  }

  function getValues(str1: string, str2: string): string[] {
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
