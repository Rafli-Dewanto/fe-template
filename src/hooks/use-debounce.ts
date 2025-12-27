import { useCallback, useEffect, useRef, useState } from "react";

/**
 * Debounces a value (e.g., a search term string).
 * Updates the returned value only after the specified delay has passed without changes.
 */
export const useDebounce = <T>(value: T, delay: number): T => {
  const [debouncedValue, setDebouncedValue] = useState<T>(value);

  useEffect(() => {
    const handler = setTimeout(() => {
      setDebouncedValue(value);
    }, delay);

    return () => {
      clearTimeout(handler);
    };
  }, [value, delay]);

  return debouncedValue;
};

/**
 * Debounces a function execution.
 * Returns a new function that, when called, delays triggering the original function
 * until 'delay' ms have passed since the last call.
 */
export const useDebounceFunction = <Args extends unknown[], R>(
  fn: (...args: Args) => R,
  delay: number
) => {
  // Use ref to store the latest version of the function to avoid re-creating the
  // debounced wrapper when the function dependency changes.
  const fnRef = useRef(fn);
  const timeoutRef = useRef<ReturnType<typeof setTimeout> | undefined>(undefined);

  useEffect(() => {
    fnRef.current = fn;
  }, [fn]);

  // Clean up timeout on unmount
  useEffect(() => {
    return () => {
      if (timeoutRef.current) {
        clearTimeout(timeoutRef.current);
      }
    };
  }, []);

  return useCallback(
    (...args: Args) => {
      if (timeoutRef.current) {
        clearTimeout(timeoutRef.current);
      }

      timeoutRef.current = setTimeout(() => {
        fnRef.current(...args);
      }, delay);
    },
    [delay]
  );
};
