// 语言标识
export enum LanguageIdentities {
  // 英语 (原始语言)
  "en" = "en",
  // 简体和繁体中文标识来源参见 Language Tags 部分 https://sites.psu.edu/symbolcodes/languages/asia/chinese/
  // 简体中文
  "zh-Hans" = "zh-Hans",
  // 繁体中文
  "zh-Hant" = "zh-Hant",
}

export class LanguageIdentityModal {
  public static validate(value: string): value is LanguageIdentities {
    return Object.values(LanguageIdentities).includes(value as LanguageIdentities);
  }

  /**
   * 尝试从浏览器获取语言标识, 并且转换为标准的 LanguageIdentities
   */
  public static getBrowserLanguage(): LanguageIdentities {
    const language = navigator.language.toLowerCase();
    if (language.startsWith("zh")) {
      if (
        language === "zh-yue"
        || language === "zh-hk"
        || language === "zh-tw"
      ) {
        return LanguageIdentities["zh-Hant"];
      }
      return LanguageIdentities["zh-Hans"];
    }
    return LanguageIdentities.en;
  }
}
