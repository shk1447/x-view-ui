import React, { useRef, useEffect, useCallback } from 'react';
import type { Maybe } from '../Types';

export function useLatestFunc<T extends Maybe<(...args: any[]) => any>>(
  fn: T,
): T {
  const ref = useRef(fn);

  useEffect(() => {
    ref.current = fn;
  });

  const callbackFn = useCallback((...args: Parameters<NonNullable<T>>) => {
    ref.current!(...args);
  }, []) as T;

  return fn != undefined ? callbackFn : fn;
}
