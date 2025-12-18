import { Badge } from '@/components/ui/badge';
import { Separator } from '@/components/ui/separator';
import { sum } from '@/lib/utils';
import { useReadRegisters } from '@/store';
import { FC } from 'react';
import { useTranslation } from 'react-i18next';

type ExpenseCategoriesItemProps = {
  name: string;
  values: string[];
};

export const ExpenseCategoriesItem: FC<ExpenseCategoriesItemProps> = ({ name, values }) => {
  const { t } = useTranslation('translation');
  const expenses = useReadRegisters('expenses');
  const items = expenses.filter((x) => values.includes(x.name));
  const total = sum(items);
  return (
    <div className="p-0">
      <div className="flex justify-between">
        <Badge className="items-stretch bg-sky-500 hover:bg-sky-400 ">{name}</Badge>
        <span className="font-semibold text-red-600">-{t('currency', { value: total })}</span>
      </div>
      <div className="mt-4">
        {items.map((item) => (
          <section key={item.id} className="px-2">
            <div className="flex justify-between">
              <span className="text-xs font-semibold text-slate-700">{item.name}</span>
              <span className="text-xs text-red-600">-{t('currency', { value: item.value })}</span>
            </div>
            <Separator className="my-2" />
          </section>
        ))}
      </div>
    </div>
  );
};
