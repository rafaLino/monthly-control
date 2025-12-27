import { ConditionalColor, CurrencyItem } from '@/components/currency-item';
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from '@/components/ui/card';
import { sumItems } from '@/lib/utils';
import { FC } from 'react';
import { Transaction } from '../types/transaction';

export const Summary: FC<{
  items: Transaction[];
  refDate: string | null;
}> = ({ items, refDate }) => {
  const summary = computeSummary(items);
  return (
    <Card className="flex flex-col w-full justify-center items-center">
      <CardHeader className="items-center">
        <CardTitle>Summary</CardTitle>
        <CardDescription>{refDate}</CardDescription>
      </CardHeader>
      <CardContent className="flex flex-col w-full">
        {summary.map((item) => (
          <div key={item.name} className="flex flex-row justify-around gap-2 capitalize">
            <span className="font-medium">{item.name}:</span>
            <CurrencyItem value={item.value} color={item.color} />
          </div>
        ))}
      </CardContent>
    </Card>
  );
};

function computeSummary(items: Transaction[]) {
  const cost = sumItems(
    items.filter((item) => Number.parseFloat(item.amount) > 0),
    (item) => Number.parseFloat(item.amount)
  );
  const paid = sumItems(
    items.filter((item) => Number.parseFloat(item.amount) < 0),
    (item) => Number.parseFloat(item.amount)
  );

  return [
    {
      name: 'balance',
      value: cost + paid,
      color: { true: 'text-blue-400' } as Partial<ConditionalColor>
    },
    {
      name: 'expenses',
      value: cost,
      color: { true: 'text-red-400' } as Partial<ConditionalColor>
    },
    {
      name: 'paid',
      value: paid,
      color: { false: 'text-green-400' } as Partial<ConditionalColor>
    }
  ];
}
