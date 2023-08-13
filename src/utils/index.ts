export const debounce = <T extends (...args: any[]) => void>(func: T, delay: number): (...args: Parameters<T>) => void => {
  let timeoutId: ReturnType<typeof setTimeout>

  return (...args: Parameters<T>) => {
    clearTimeout(timeoutId)
    timeoutId = setTimeout(() => {
      func.apply(this, args)
    }, delay)
  }
}

export const getFilteredList = (list: any[], key: string, value?: string, count?: number) => {
  if (value) {
    const newArr = []
    for (const s of list) {
      if (s[key].toLowerCase().includes(value.toLowerCase())) {
        newArr.push(s)
      }
      if (count && newArr.length === count) break
    }
    return newArr
  } else {
    return []
  }
}
