import { ScrollArea } from '@/components/ui/scroll-area';
import { FC } from 'react';
import { ExpenseCategoriesItem } from './item';

type ExpenseCategoriesListProps = {
  list: Array<{ name: string; value: string[] }> | undefined;
};
export const ExpenseCategoriesList: FC<ExpenseCategoriesListProps> = ({ list }) => {
  return (
    <ScrollArea className="h-64">
      {list?.map((category) => (
        <ExpenseCategoriesItem key={category.name} name={category.name} values={category.value} />
      ))}
    </ScrollArea>
  );
};
