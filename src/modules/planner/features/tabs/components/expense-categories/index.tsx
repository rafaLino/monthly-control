import { Loading } from '@/components/loading';
import { Button } from '@/components/ui/button';
import { Popover, PopoverContent, PopoverTrigger } from '@/components/ui/popover';
import { fetchExpenseCategories } from '@/lib/expense-categories';
import { cn } from '@/lib/utils';
import type { ExpenseCategories } from '@/types/expense-categories';
import { QueryKeys } from '@/types/queryKeys';
import { useQuery } from '@tanstack/react-query';
import { ScrollText } from 'lucide-react';
import { ExpenseCategoriesList } from './list';
import { LoaderSkeleton } from './skeleton';

export const ExpenseCategoriesCard = () => {
  const { data, isLoading } = useQuery({
    queryKey: [QueryKeys.expenseCategories],
    queryFn: fetchExpenseCategories,
    select: (data) => data.categories as ExpenseCategories['categories']
  });

  return (
    <Popover>
      <PopoverTrigger asChild>
        <Button variant="link" className={cn('px-2 sm:px-4 aria-expanded:opacity-50', isLoading && 'animate-pulse')}>
          <ScrollText className="w-5 h-5" />
        </Button>
      </PopoverTrigger>
      <PopoverContent className="w-80 shadow-2xl bg-muted" align="start">
        <Loading loading={isLoading} fallback={<LoaderSkeleton />}>
          <ExpenseCategoriesList list={data} />
        </Loading>
      </PopoverContent>
    </Popover>
  );
};
