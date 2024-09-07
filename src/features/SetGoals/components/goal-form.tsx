import { useSettingsForm } from '@/components/setting-form/settings-form-hook';
import { FormDescription } from '@/components/ui/form';
import { useTranslation } from 'react-i18next';
import { GoalFormField } from './goal-form-field';

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
