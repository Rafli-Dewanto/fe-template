import { useEffect, useState } from 'react'

export const useDebounce = <T>(value: T, delay: number): T => {
  const [debouncedValue, setDebouncedValue] = useState<T>(value)

  useEffect(() => {
    const handler = setTimeout(() => {
      setDebouncedValue(value)
    }, delay)

    return () => {
      clearTimeout(handler)
    }
  }, [value, delay])

  return debouncedValue
}

export const useDebounceFunction = (fn: Function, delay: number) => {
  const [debouncedValue, setDebouncedValue] = useState(fn);

  useEffect(() => {
    const handler = setTimeout(() => {
      setDebouncedValue(fn);
    }, delay);

    return () => {
      clearTimeout(handler);
    };
  }, [fn, delay]);

  return debouncedValue;
}
