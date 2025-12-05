import { fetchExpenseCategories, postExpenseCategories } from '@/lib/expense-categories';
import { QueryKeys } from '@/types/queryKeys';
import { useMutation, useQuery, useQueryClient } from '@tanstack/react-query';

export function useExpenseCategories() {
  const queryClient = useQueryClient();
  const { data } = useQuery({
    queryKey: [QueryKeys.expenseCategories],
    queryFn: fetchExpenseCategories
  });

  const { mutateAsync } = useMutation({
    mutationFn: postExpenseCategories,
    onSuccess: async () => {
      await queryClient.invalidateQueries({ queryKey: [QueryKeys.expenseCategories] });
    }
  });

  return { data, mutateAsync };
}
