import {QS} from "../query-selector";
import {MenuType} from "./menu-type";
import {delay} from "../../atom";
import {Ext} from "../ext";

export class TradeController {
  private _href!: string;

  /**
   * 获取菜单 dom 元素
   * @protected
   */
  public getMenuEls(): Record<MenuType, HTMLElement> {
    return {
      [MenuType.About]: document.querySelector('#about')!,
      [MenuType.Settings]: document.querySelector('#settings')!,
      [MenuType.Search]: document.querySelector('#search')!,
      [MenuType.Exchange]: document.querySelector('#exchange')!,
    }
  }

  constructor() {
  }

  /**
   * 展开当前菜单所有可以展开的选项
   */
  public async expandMenuAllOptions() {
    switch (this.menuType) {
      case MenuType.Search:
        await this._expandSearchMenuAllOptions();
        break;
      case MenuType.Exchange:
        await this._expandExchangeMenuAllOptions();
        break;
    }
  }

  /**
   * 展开 Search 菜单所有可以展开的选项
   */
  public async _expandSearchMenuAllOptions() {
    await this._expandSearchMenuFilter()
    await this._expandSearchMenuFilterGroup()
  }

  /**
   * 展开 Exchange 菜单所有可以展开的选项
   */
  public async _expandExchangeMenuAllOptions() {
    await this._expandExchangeMenuFilter();
    await this._expandExchangeMenuCurrencyGroup();
  }

  public get menuType(): MenuType | undefined {
    if (!this._href) {
      return undefined
    }
    if (this._href.includes("trade/search")) {
      return MenuType.Search;
    }
    if (this._href.includes("trade/exchange")) {
      return MenuType.Exchange;
    }
    if (this._href.includes("trade/settings")) {
      return MenuType.Settings;
    }
    if (this._href.includes("trade/about")) {
      return MenuType.About;
    }

    return undefined;
  }

  public async getMenuType(): Promise<MenuType> {
    if (this._href.includes("trade/search")) {
      return Promise.resolve(MenuType.Search);
    }
    if (this._href.startsWith("trade/exchange")) {
      return Promise.resolve(MenuType.Exchange);
    }
    if (this._href.startsWith("trade/settings")) {
      return Promise.resolve(MenuType.Settings);
    }
    if (this._href.startsWith("trade/about")) {
      return Promise.resolve(MenuType.About);
    }

    throw new Error("Unknown menu type")
  }

  public getOutputFileName(menuType: MenuType): string {
    switch (menuType) {
      case MenuType.Search:
        return "menu-search";
      case MenuType.Exchange:
        return "menu-exchange";
      case MenuType.Settings:
        return "menu-settings";
      case MenuType.About:
        return "menu-about";
    }
    throw new Error("Unknown menu type")
  }

  public get outputFileName(): string {
    return this.getOutputFileName(this.menuType!)
  }


  /**
   * 展开 Search 菜单的筛选器
   * @protected
   */
  protected async _expandSearchMenuFilter(): Promise<void> {
    // 点击高级搜索
    const showFiltersBtn = QS.findByText("span", "Show Filters")
    if (showFiltersBtn) {
      showFiltersBtn.click();
      await delay(1000)
    }
  }

  /**
   * 展开 Search 菜单的筛选组
   */
  public async _expandSearchMenuFilterGroup(): Promise<void> {
    const filterGroups = Array.from(document.querySelectorAll('.filter-group')) as HTMLElement[];
    filterGroups.forEach(el => {
      const btn = el.querySelector(".input-group-btn .toggle-btn") as HTMLElement
      const event = new CustomEvent("click");
      if (!el.classList.contains("expanded")) {
        btn!.dispatchEvent(event);
      }
    })
  }

  /**
   * 展开 Exchange 菜单的筛选器
   */
  protected async _expandExchangeMenuFilter(): Promise<void> {
    // 点击高级搜索
    const showFiltersBtn = QS.findByText("span", "Show Filters")
    if (showFiltersBtn) {
      showFiltersBtn.click();
      await delay(1000)
    }
  }

  /**
   * 展开 Exchange 菜单的通货组
   */
  protected async _expandExchangeMenuCurrencyGroup(): Promise<void> {
    const filterGroups = Array.from(document.querySelectorAll('.filter-group-body > .filter')) as HTMLElement[];
    filterGroups.forEach(el => {
      const filterOptions = el.querySelector(".filter-options");
      if (!filterOptions) {
        el.querySelector(".filter-title")!.dispatchEvent(new CustomEvent("click"));
      }
    })
  }

  public initialize() {
    let timer = setInterval(() => {
      Ext.get.url()
        .then(href => {
          if (href) {
            this._href = href;
            clearInterval(timer);
          }
        })
    }, 1000)
    return Ext.get.url()
      .then((href) => {
        this._href = href;
        // console.log("website-controller.official.ts: initialize", this.menuType)
      })
  }
}
