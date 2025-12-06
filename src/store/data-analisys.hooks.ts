import { DEFAULT_LOCAL_PARAMS, LocalParams } from '@/types/local-params';
import { Message } from '@/types/message';
import { useShallow } from 'zustand/shallow';
import { useGlobalStore } from './store';

type TKey = keyof LocalParams;
type TValue = LocalParams[TKey];

export function useLocalParams<E extends TValue>(param: TKey) {
  const [params, setParams] = useLocalParamsAll();

  const get = (key: TKey) => {
    if (!params[key]) {
      return DEFAULT_LOCAL_PARAMS[param] as E;
    }
    return params[key] as E;
  };

  const set = (key: TKey, newValue: TValue) => {
    if (key) {
      setParams({ [key]: newValue });
    }
  };

  return [get(param), set, get] as const;
}

export function useLocalParamsAll() {
  return useGlobalStore(useShallow((state) => [state.params, state.dataAnalysisActions.setParams] as const));
}

export function useMessages(): Message[] {
  return useGlobalStore((state) => {
    return Array.from(state.messages, ([key, value]) => ({ id: key, ...value }));
  });
}

export function useChatSession() {
  return useGlobalStore(useShallow((state) => [state.chatSession, state.dataAnalysisActions.setChatSession] as const));
}

export function useSetMessages() {
  return useGlobalStore(
    useShallow((state) => ({
      setMessages: state.dataAnalysisActions.setMessages,
      clearMessages: state.dataAnalysisActions.clearMessages
    }))
  );
}

//services
export const getParam = <E extends TValue = string>(name: TKey) => {
  const params = useGlobalStore.getState().params;

  return (params[name] ?? DEFAULT_LOCAL_PARAMS[name]) as E;
};
