import util from 'util'
export function removeUndefinedFields<T>(obj: T): T {
  return JSON.parse(JSON.stringify(obj))
}

export const logFullObject = (obj: any, label?: string) => console.log(label || '', util.inspect(obj, false, null, true))
