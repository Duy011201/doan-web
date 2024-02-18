export function isEmpty(value: any): boolean {
  if (value === undefined || value === null) {
      return true;
  }

  if (typeof value === "string") {
      return value.length === 0;
  }

  if (typeof value === "object") {
      return Object.keys(value).length === 0;
  }

  return false;
}

