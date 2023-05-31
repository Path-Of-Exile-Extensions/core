import {Runtime} from "webextension-polyfill";

export class PortStore {
  private readonly store: Set<Runtime.Port>

  constructor() {
    this.store = new Set<Runtime.Port>();
  }

  add(port: Runtime.Port) {
    this.store.add(port);
  }

  values(): Runtime.Port[] {
    return [...this.store.values()];
  }

  has(port: Runtime.Port): boolean {
    return this.store.has(port);
  }

  /**
   * 移除 port
   *
   * 当参数为 number 时, 移除 sender.tab.id 为该值的 port
   * 当参数为 Runtime.Port 时, 移除该 port
   * 如果移除成功, 返回 true, 否则返回 false
   * @param port - Runtime.Port
   */
  remove(port: Runtime.Port) {
    this.store.delete(port);
  }

  /**
   * 移除 port
   *
   * 当参数为 number 时, 移除 sender.tab.id 为该值的 port
   * 当参数为 Runtime.Port 时, 移除该 port
   * 如果移除成功, 返回 true, 否则返回 false
   * @param tabId - number
   */
  removeByTabId(tabId: number): boolean {
    const ports = this.values();
    const portIndex = ports.findIndex(p => p.sender?.tab?.id === tabId);
    if (portIndex !== -1) {
      this.store.delete(ports[portIndex]);
      return true;
    }
    return false;
  }

}
