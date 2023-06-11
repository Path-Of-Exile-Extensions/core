// 判断是否为空数组
export function isEmptyArray(val: unknown): val is [] {
  return Array.isArray(val) && val.length === 0;
}

// 判断是否为 Null 或 Undefined
export function isNil(val: unknown): val is null | undefined {
  return val === null || val === undefined;
}

// 判断是否为 Null 或 Undefined 或 空数组
export function isNilOrEmpty(val: unknown): val is null | undefined | [] {
  return isNil(val) || isEmptyArray(val);
}

// not
export function not<T>(fn: (val: T) => boolean) {
  return (val: T) => !fn(val);
}

// 是否为空对象
export function isEmptyObject(val: unknown): val is {} {
  return typeof val === 'object' && Object.keys(val!).length === 0;
}
