export namespace QS {
  export function findByText(selector: string, text: string) {
    const elements: HTMLElement[] = Array.from(document.querySelectorAll(selector));
    return elements.find(element => {
      return RegExp(text).test(element.textContent!);
    });
  }
  export function querySelector(el: HTMLElement | Element | Document, selector: string) {
    return el.querySelector(selector) as HTMLElement;
  }
  export function querySelectorAll(el: HTMLElement | Element, selector: string) {
    return Array.from(el.querySelectorAll(selector)) as HTMLElement[];
  }
}
