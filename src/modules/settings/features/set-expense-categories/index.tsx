import { zodResolver } from '@hookform/resolvers/zod';
import { useForm } from 'react-hook-form';
import { SettingsForm } from '../../components/setting-form';
import { ExpenseCategoriesForm } from './components/expense-categories-form';
import { ExpenseCategories, Schema } from './types/schema';
import { useQuery } from '@tanstack/react-query';
import { paramsService } from '@/services/params.service';


export function SetExpenseCategories() {
  /**
   * FormState is not working properly with react compiler 
   */
  'use no memo'

  const { data } = useQuery({
    queryKey: ['categories'],
    queryFn: () => paramsService.getParams('expenses_categories')
  })
  const form = useForm<ExpenseCategories>({
    resolver: zodResolver(Schema),
    mode: 'onChange',
    defaultValues: {
      categories: [{ name: '', value: [] }]
    }
  });


  const handleSubmit = (data: ExpenseCategories) => {
    console.log(data)
  }

  return (
    <SettingsForm
      form={form}
      title={'ExpenseCategoriesSettings.title'}
      description={'ExpenseCategoriesSettings.description'}
      onSubmit={handleSubmit}
    >
      <ExpenseCategoriesForm />
    </SettingsForm>
  );
}
