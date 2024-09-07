import { useContext } from 'react';
import { SettingsFormContext } from './settings-form-context';

export const useSettingsForm = () => {
  const context = useContext(SettingsFormContext);
  if (!context) throw new Error('This hook should be used in SettingFormProvider');

  return context;
};
