import { zodResolver } from '@hookform/resolvers/zod';
import { useForm } from 'react-hook-form';
import { z } from 'zod';
import { SettingsForm } from '../../components/setting-form';
import { ExpensesCategoryForm } from './components/expenses-category-form';

const Schema = z.object({
  categories: z.array(
    z.object({
      name: z.string().min(1),
      value: z.array(z.string()).min(1)
    })
  )
});
type ExpensesMap = z.infer<typeof Schema>;

export function SetExpensesCategory() {
  const form = useForm<ExpensesMap>({
    resolver: zodResolver(Schema),
    mode: 'onChange',
    defaultValues: {
      categories: [{ name: '', value: [] }]
    }
  });

  return (
    <SettingsForm form={form} title={'expensesCategorySettings.title'} description={'expensesCategorySettings.description'}>
      <ExpensesCategoryForm />
    </SettingsForm>
  );
}
