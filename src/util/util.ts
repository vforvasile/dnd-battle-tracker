export function objKeys<T>(value: T): (keyof T)[] {
    // @ts-ignore
    return Object.keys(value) as (keyof T)[];
  }