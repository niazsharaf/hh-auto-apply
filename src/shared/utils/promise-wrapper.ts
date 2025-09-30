export function promiseWrapper<T>(fn: () => Promise<T>): Promise<T> {
  return fn().catch((err) => {
    return Promise.reject(err);
  });
}
