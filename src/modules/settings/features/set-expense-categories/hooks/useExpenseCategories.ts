import { fetchExpenseCategories, postExpenseCategories } from '@/lib/expense-categories';
import { ExpenseCategories } from '@/types/expense-categories';
import { QueryKeys } from '@/types/queryKeys';
import { useMutation, useQuery } from '@tanstack/react-query';

export function useExpenseCategories() {
  const { data } = useQuery({
    queryKey: [QueryKeys.expenseCategories],
    queryFn: fetchExpenseCategories
  });

  const { mutateAsync } = useMutation({
    mutationFn: postExpenseCategories,
    onMutate: (data, context) => {
      const previous = context.client.getQueryData([QueryKeys.expenseCategories]) as ExpenseCategories;
      context.client.setQueryData([QueryKeys.expenseCategories], data);
      return { previous };
    },
    onError: (_, __, result, context) => {
      context.client.setQueryData([QueryKeys.expenseCategories], result?.previous);
    }
  });

  return { data, mutateAsync };
}
