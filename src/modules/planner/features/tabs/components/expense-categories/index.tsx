import { Loading } from '@/components/loading';
import { Button } from '@/components/ui/button';
import { Popover, PopoverContent, PopoverTrigger } from '@/components/ui/popover';
import { fetchExpenseCategories } from '@/lib/expense-categories';
import { cn } from '@/lib/utils';
import { QueryKeys } from '@/types/queryKeys';
import { useQuery } from '@tanstack/react-query';
import { ScrollText } from 'lucide-react';
import { lazy } from 'react';
import { LoaderSkeleton } from './skeleton';

const ExpenseCategoriesList = lazy(() => import('./list').then((module) => ({ default: module.ExpenseCategoriesList })));

export const ExpenseCategoriesCard = () => {
  const { data, isLoading } = useQuery({
    queryKey: [QueryKeys.expenseCategories],
    queryFn: fetchExpenseCategories,
    select: (data) => data.categories
  });

  return (
    <Popover>
      <PopoverTrigger asChild>
        <Button variant="link" className={cn('p-0 aria-expanded:opacity-50 h-0', isLoading && 'animate-pulse')}>
          <ScrollText className="w-5 h-5" />
        </Button>
      </PopoverTrigger>
      <PopoverContent className="w-60 shadow-2xl px-3 bg-linear-to-tr from-yellow-100 to-yellow-50" align="end" sideOffset={10}>
        <Loading fallback={<LoaderSkeleton />} loading={isLoading}>
          <ExpenseCategoriesList list={data} />
        </Loading>
      </PopoverContent>
    </Popover>
  );
};
