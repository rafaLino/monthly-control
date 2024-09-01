import { useSettingsForm } from '@/components/setting-form/settings-form-context';
import { FormDescription } from '@/components/ui/form';
import { GoalFormField } from './goal-form-field';

export function GoalForm() {
  const { enabled } = useSettingsForm();
  return (
    <>
      <div className="flex flex-row gap-2">
        <GoalFormField name="incomes" disabled={!enabled} />
        <GoalFormField name="expenses" disabled={!enabled} />
        <GoalFormField name="investments" disabled={!enabled} />
      </div>
      <div className="mt-2">
        <FormDescription>Goals must be equal to 1.</FormDescription>
      </div>
    </>
  );
}
