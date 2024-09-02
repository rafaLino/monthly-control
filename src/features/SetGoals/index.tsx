import { SettingsForm } from '@/components/setting-form';
import { useGoals } from '@/store/store';
import { Goal, Schema } from '@/types/goal';
import { zodResolver } from '@hookform/resolvers/zod';
import { useForm } from 'react-hook-form';
import { GoalForm } from './components/goal-form';

export function SetGoals() {
  const [goals, setGoals] = useGoals();

  const form = useForm<Goal>({
    resolver: zodResolver(Schema),
    defaultValues: goals,
  });

  const handleSubmit = (goal: Goal) => {
    setGoals(goal);
  };

  return (
    <SettingsForm
      form={form}
      title="goalSettings.title"
      description="goalSettings.description"
      onSubmit={handleSubmit}
    >
      <GoalForm />
    </SettingsForm>
  );
}
