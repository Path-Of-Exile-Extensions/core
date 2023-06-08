export function executeAtLeast<T>(promise: Promise<T>, minimumDelay: number): Promise<T> {
  const executionTime = Date.now();

  return new Promise<T>((resolve, reject) => {
    const resolveAfterDelay = () => {
      const elapsedTime = Date.now() - executionTime;
      const remainingDelay = Math.max(minimumDelay - elapsedTime, 0);

      setTimeout(() => {
        promise
          .then(resolve)
          .catch(reject);
      }, remainingDelay);
    };

    resolveAfterDelay();
  });
}
