import { FormDescription } from '@/components/ui/form';
import { useSettingsForm } from '@/modules/settings/components/setting-form/settings-form-hook';
import { useTranslation } from 'react-i18next';
import { GoalFormField } from './goal-form-field';

export function GoalForm() {
  const { t } = useTranslation();
  const { enabled } = useSettingsForm();
  return (
    <>
      <div className="flex flex-row gap-2">
        <GoalFormField label={t('goalSettings.incomes')} name="incomes" disabled={!enabled} />
        <GoalFormField label={t('goalSettings.expenses')} name="expenses" disabled={!enabled} />
        <GoalFormField label={t('goalSettings.investments')} name="investments" disabled={!enabled} />
      </div>
      <div className="mt-2">
        <FormDescription>{t('goalSettings.helper')}</FormDescription>
      </div>
    </>
  );
}
