import { createContext } from 'react';

type SettingsFormContextType = {
  enabled: boolean;
};
export const SettingsFormContext = createContext<SettingsFormContextType>(
  {} as SettingsFormContextType,
);