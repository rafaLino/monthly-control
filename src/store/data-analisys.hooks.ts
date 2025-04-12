import { DEFAULT_LOCAL_PARAMS, LocalParams } from '@/types/local-params';
import { useGlobalStore } from './store';

type TKey = keyof LocalParams;
type TValue = LocalParams[TKey];

export function useLocalParams<E extends TValue>(param: TKey) {
  return useGlobalStore((state) => {
    const params = state.params;
    const setParams = state.dataAnalysisActions.setParams;
    const get = (key: TKey) => {
      if (!key) {
        return DEFAULT_LOCAL_PARAMS[param] as E;
      }
      return params[key] as E;
    };

    const set = (key: TKey, newValue: TValue) => {
      if (key && newValue) {
        setParams({ [key]: newValue });
      }
    };

    const value = get(param);

    return [value, set, get] as const;
  });
}

export function useLocalParamsAll() {
  return useGlobalStore((state) => [state.params, state.dataAnalysisActions.setParams] as const);
}
