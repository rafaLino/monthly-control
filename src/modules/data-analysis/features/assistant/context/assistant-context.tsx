import { GenerativeModel } from 'firebase/ai';
import { PropsWithChildren, createContext, useRef } from 'react';
import initConfig from '../config/initConfig';

export type AssistantContext = {
  model: GenerativeModel;
};

export const AssistantContext = createContext<GenerativeModel | undefined>(undefined);

export const AssistantProvider = ({ children }: PropsWithChildren) => {
  const model = useRef<{ model: GenerativeModel } | undefined>(initConfig());

  return <AssistantContext.Provider value={model.current?.model}>{children}</AssistantContext.Provider>;
};
