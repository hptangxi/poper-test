export const debounce = <T extends (...args: any[]) => void>(func: T, delay: number): (...args: Parameters<T>) => void => {
  let timeoutId: ReturnType<typeof setTimeout>

  return (...args: Parameters<T>) => {
    clearTimeout(timeoutId)
    timeoutId = setTimeout(() => {
      func.apply(this, args)
    }, delay)
  }
}

export const getFilteredList = (list: any[], key?: string | string[], count?: number) => {
  if (key) {
    const newArr = []
    for (const s of list) {
      if (Array.isArray(key)) {
        if (key.includes(s.title)) {
          newArr.push(s)
        }
      } else if (s.title.toLowerCase().includes(key.toLowerCase())) {
        newArr.push(s)
      }
      if (count && newArr.length === count) break
    }
    return newArr
  } else {
    return list.slice(0, count)
  }
}
