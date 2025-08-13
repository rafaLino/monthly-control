import { GenerativeModel } from 'firebase/ai';
import { createContext, PropsWithChildren, useEffect, useRef } from 'react';
import initConfig from '../config/initConfig';

export type AssistantContext = {
  model: GenerativeModel;
};

export const AssistantContext = createContext<GenerativeModel | null>(null);

export const AssistantProvider = ({ children }: PropsWithChildren) => {
  const model = useRef<GenerativeModel | null>(null);

  useEffect(() => {
    const config = initConfig();
    if (!config?.model) {
      return;
    }
    model.current = config.model;
  }, []);

  return <AssistantContext.Provider value={model.current}>{children}</AssistantContext.Provider>;
};
