import { createContext, PropsWithChildren, useMemo, useState } from 'react';
import initConfig from '../config/initConfig';
import { GenerativeModel } from 'firebase/ai';

export type AssistantContext = {
  model: GenerativeModel;
};

export const AssistantContext = createContext<AssistantContext | undefined>(undefined);

export const AssistantProvider = ({ children }: PropsWithChildren) => {
  const [model] = useState(() => {
    const config = initConfig();
    if (!config?.model) {
      throw new Error('model is not defined');
    }
    return config.model;
  });

  const contextValue = useMemo(() => ({ model }), [model]);

  return <AssistantContext.Provider value={contextValue}>{children}</AssistantContext.Provider>;
};
