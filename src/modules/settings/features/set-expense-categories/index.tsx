import { ExpenseCategories, Schema } from '@/types/expense-categories';
import { zodResolver } from '@hookform/resolvers/zod';
import { useForm } from 'react-hook-form';
import { SettingsForm } from '../../components/setting-form';
import { ExpenseCategoriesForm } from './components/expense-categories-form';
import { useExpenseCategories } from './hooks/useExpenseCategories';

export function SetExpenseCategories() {
  /**
   * FormState is not working properly with react compiler
   */
  'use no memo';

  const { data, mutateAsync } = useExpenseCategories();

  const form = useForm<ExpenseCategories>({
    resolver: zodResolver(Schema),
    mode: 'onChange',
    defaultValues: {
      categories: [{ name: '', value: [] }]
    },
    values: data,
    resetOptions: { keepDirtyValues: true }
  });

  return (
    <SettingsForm
      form={form}
      title={'ExpenseCategoriesSettings.title'}
      description={'ExpenseCategoriesSettings.description'}
      onSubmitAsync={mutateAsync}
    >
      <ExpenseCategoriesForm />
    </SettingsForm>
  );
}
