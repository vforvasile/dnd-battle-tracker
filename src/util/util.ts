export function objKeys<T>(value: T): (keyof T)[] {
  // @ts-ignore
  return Object.keys(value) as (keyof T)[];
}

export function notEmpty<T>(value: T | undefined | null): value is T {
  return value !== undefined && value !== null;
}

export function isNumber(value: unknown): value is number {
  return typeof value === "number";
}
