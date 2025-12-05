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
  ).refine(items => {
    const names = new Set(items.map(item => item.name.trim()))
    return names.size === items.length
  }, { message: 'All items must be unique.' })
});

type ExpensesCategory = z.infer<typeof Schema>;

export function SetExpensesCategory() {
  /**
   * FormState is not working properly with react compiler 
   */
  'use no memo'
  const form = useForm<ExpensesCategory>({
    resolver: zodResolver(Schema),
    mode: 'onChange',
    defaultValues: {
      categories: [{ name: '', value: [] }]
    }
  });

  const handleSubmit = (data: ExpensesCategory) => {
    console.log(data)
  }

  return (
    <SettingsForm
      form={form}
      title={'expensesCategorySettings.title'}
      description={'expensesCategorySettings.description'}
      onSubmit={handleSubmit}
    >
      <ExpensesCategoryForm />
    </SettingsForm>
  );
}
