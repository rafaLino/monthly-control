import { useLocalStorage } from '@/hooks/useLocalStorage';
import { useCallback, useMemo } from 'react';

export type LocalParams = {
    'default_waiting_time_for_generate_csv': number;
    'disable_automatic_download': boolean;
}

const DEFAULT_PARAMS: LocalParams = {
    'default_waiting_time_for_generate_csv': 10,
    'disable_automatic_download': false,
};

type TKey = keyof LocalParams;
type TValue = LocalParams[TKey];

export function useLocalParams<E extends TValue>(param: TKey) {
    const [local, setLocal] = useLocalStorage<LocalParams>('local_params', DEFAULT_PARAMS);

    const get = useCallback((key: TKey) => {
        return local[key] as E;
    }, [local]);

    const set = useCallback((key: TKey, newValue: TValue) => {
        setLocal((prev) => ({
            ...prev,
            [key]: newValue,
        }));
    }, [setLocal]);

    const value = useMemo(() => get(param), [param]);

    return [value, set, get] as const;
}