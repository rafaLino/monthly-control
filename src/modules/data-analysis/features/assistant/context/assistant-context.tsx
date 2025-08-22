import { GenerativeModel } from "firebase/ai";
import { PropsWithChildren, createContext, useEffect, useState } from "react";
import initConfig from "../config/initConfig";

export type AssistantContext = {
  model: GenerativeModel;
};

export const AssistantContext = createContext<GenerativeModel | undefined>(
  undefined
);

export const AssistantProvider = ({ children }: PropsWithChildren) => {
  const [model, setModel] = useState<GenerativeModel | undefined>();

  useEffect(() => {
    if (!model) {
      setModel(initConfig());
    }
  }, []);

  return (
    <AssistantContext.Provider value={model}>
      {children}
    </AssistantContext.Provider>
  );
};
