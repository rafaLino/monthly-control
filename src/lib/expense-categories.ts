import { Parameter, paramsService } from '@/services/params.service';
import { ExpenseCategories } from '@/types/expense-categories';
import { QueryKeys } from '@/types/queryKeys';

export const fetchExpenseCategories = async () => {
  const parameter = await paramsService.getParams(QueryKeys.expenseCategories);

  if (!parameter) {
    throw new Error('parameter not found');
  }

  if (parameter.type !== 'json') {
    throw new Error('invalid parameter type');
  }

  const categories = JSON.parse(parameter.value);

  return { categories } as ExpenseCategories;
};

export const postExpenseCategories = async (data: ExpenseCategories) => {
  const parameter = {
    name: QueryKeys.expenseCategories,
    type: 'json',
    value: JSON.stringify(data.categories)
  } satisfies Parameter;

  await paramsService.saveParams(parameter);
};
