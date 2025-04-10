import { LocalParams } from '@/types/local-params';
import { useCallback, useMemo } from 'react';
import { useGlobalStore } from './store';

type TKey = keyof LocalParams;
type TValue = LocalParams[TKey];

export function useLocalParams<E extends TValue>(param: TKey) {
  const [local, setLocalParams] = useGlobalStore((state) => [state.params, state.dataAnalysisActions.setParams]);

  const get = useCallback(
    (key: TKey) => {
      return local[key] as E;
    },
    [local]
  );

  const set = useCallback(
    (key: TKey, newValue: TValue) => {
      setLocalParams({ [key]: newValue });
    },
    [setLocalParams]
  );

  const value = useMemo(() => get(param), [param, local]);

  return [value, set, get] as const;
}
