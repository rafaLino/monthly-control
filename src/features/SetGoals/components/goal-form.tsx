import { useSettingsForm } from '@/components/setting-form/settings-form-hook';
import { FormDescription } from '@/components/ui/form';
import { GoalFormField } from './goal-form-field';
import { useTranslation } from 'react-i18next';

export function GoalForm() {
  const { t } = useTranslation();
  const { enabled } = useSettingsForm();
  return (
    <>
      <div className="flex flex-row gap-2">
        <GoalFormField name="incomes" disabled={!enabled} />
        <GoalFormField name="expenses" disabled={!enabled} />
        <GoalFormField name="investments" disabled={!enabled} />
      </div>
      <div className="mt-2">
        <FormDescription>{t('goalSettings.helper')}</FormDescription>
      </div>
    </>
  );
}
