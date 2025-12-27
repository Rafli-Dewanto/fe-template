import debounce from "lodash.debounce";
import { useEffect, useMemo, useRef } from "react";

import { useUnmount } from "./use-unmount";

type DebounceOptions = {
  leading?: boolean;
  trailing?: boolean;
  maxWait?: number;
};

type ControlFunctions = {
  cancel: () => void;
  flush: () => void;
  isPending: () => boolean;
};

// 1. Changed Generic: Accepts Args and R directly to avoid using 'any' in constraints
export type DebouncedState<Args extends unknown[], R> = ((...args: Args) => R | undefined) &
  ControlFunctions;

export function useDebounceCallback<Args extends unknown[], R>(
  func: (...args: Args) => R,
  delay = 500,
  options?: DebounceOptions
): DebouncedState<Args, R> {
  const funcRef = useRef(func);
  const isPendingRef = useRef(false);

  useEffect(() => {
    funcRef.current = func;
  }, [func]);

  const debounced = useMemo(() => {
    const execute = (...args: Args) => {
      isPendingRef.current = false;
      return funcRef.current(...args);
    };

    const wrapped = debounce(execute, delay, options);

    const proxy: DebouncedState<Args, R> = (...args: Args) => {
      isPendingRef.current = true;
      return wrapped(...args);
    };

    proxy.cancel = () => {
      isPendingRef.current = false;
      wrapped.cancel();
    };

    proxy.isPending = () => {
      return isPendingRef.current;
    };

    proxy.flush = () => {
      isPendingRef.current = false;
      wrapped.flush();
    };

    return proxy;
  }, [delay, options]);

  useUnmount(() => {
    debounced.cancel();
  });

  return debounced;
}
