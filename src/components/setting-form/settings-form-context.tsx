import { createContext, useContext } from 'react';

type SettingsFormContextType = {
  enabled: boolean;
};
export const SettingsFormContext = createContext<SettingsFormContextType>(
  {} as SettingsFormContextType,
);

export const useSettingsForm = () => {
  const context = useContext(SettingsFormContext);
  if (!context)
    throw new Error('This hook should be used in SettingFormProvider');

  return context;
};
