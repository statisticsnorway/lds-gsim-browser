export const getNestedObject = (nestedObject, pathArray) => {
  return pathArray.reduce((object, key) =>
      (object && object[key] !== undefined) ? object[key] : undefined,
    nestedObject
  )
}

export const truncateString = (string, length = 32) =>
  string.length > length ? string.substring(0, (length - 2)) + '...' : string
