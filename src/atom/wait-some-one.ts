export function waitSomeOne(cssSelector: string) {
  return new Promise(resolve => {
    if (document.querySelector(cssSelector)) {
      return resolve(document.querySelector(cssSelector));
    }

    const observer = new MutationObserver(_ => {
      if (document.querySelector(cssSelector)) {
        resolve(document.querySelector(cssSelector));
        observer.disconnect();
      }
    });

    observer.observe(document.body, {
      childList: true,
      subtree: true
    });
  });
}
