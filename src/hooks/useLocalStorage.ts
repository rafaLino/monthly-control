import { useCallback, useEffect, useSyncExternalStore } from 'react';

export function useLocalStorage<T = string>(
  key: string,
  initialState?: T | (() => T)
): [T, (value: T | ((prev: T) => T)) => void] {
  const getSnapshot = () => getLocalStorageItem(key);

  const store = useSyncExternalStore(localStorageSubscribe, getSnapshot);

  const setState = useCallback(
    (value: T | ((prev: T) => T)) => {
      try {
        const nextState = getState(value, store && JSON.parse(store));

        if (nextState === undefined || nextState === null) {
          removeLocalStorageItem(key);
        } else {
          setLocalStorageItem(key, nextState);
        }
      } catch (e) {
        console.warn(e);
      }
    },
    [key, store]
  );

  useEffect(() => {
    if (getLocalStorageItem(key) === null && typeof initialState !== 'undefined') {
      setLocalStorageItem(key, initialState);
    }
  }, [key, initialState]);

  return [store ? JSON.parse(store) : initialState, setState] as const;
}

const localStorageSubscribe = (callback: () => void) => {
  window.addEventListener('storage', callback);
  return () => window.removeEventListener('storage', callback);
};

const getLocalStorageItem = (key: string) => {
  return window.localStorage.getItem(key);
};

const removeLocalStorageItem = (key: string) => {
  window.localStorage.removeItem(key);
  dispatchStorageEvent(key, null);
};

const setLocalStorageItem = <T>(key: string, value: T) => {
  const stringifiedValue = JSON.stringify(value);
  window.localStorage.setItem(key, stringifiedValue);
  dispatchStorageEvent(key, stringifiedValue);
};

const dispatchStorageEvent = (key: string, newValue: string | null | undefined) => {
  window.dispatchEvent(new StorageEvent('storage', { key, newValue }));
};

const getState = (state: any, value: any) => {
  return typeof state === 'function' ? state(value) : state;
};
