import { CurrencyItem } from '@/components/currency-item';
import { Card, CardContent, CardDescription, CardHeader } from '@/components/ui/card';
import { sumItems } from '@/lib/utils';
import { getMonth } from 'date-fns';
import { FC } from 'react';
import { useTranslation } from 'react-i18next';
import { Transaction } from '../types/transaction';

export const Summary: FC<{
  items: Transaction[];
  refDate: string | null;
}> = ({ items, refDate }) => {
  const { t } = useTranslation('translation');

  if (!refDate) return null;

  const { values, total } = computeSummary(items);

  return (
    <Card className="flex flex-col col-span-2 col-start-2 w-full justify-center items-center">
      <CardHeader className="items-center p-4">
        <CardDescription>{t('date', { date: getRefDate(refDate) })}</CardDescription>
      </CardHeader>
      <CardContent className="flex flex-row gap-4 justify-evenly w-full">
        {values.map((item) => (
          <SummaryValues
            key={item.month}
            title={t('date', { date: getDate(item.month), context: { format: 'MMMM' } })}
            balance={item.balance}
            cost={item.cost}
            paid={item.paid}
          />
        ))}
        <SummaryValues title={t('transactions.total')} balance={total.balance} cost={total.cost} paid={total.paid} />
      </CardContent>
    </Card>
  );
};
const SummaryValues: FC<{ title: string; balance: number; cost: number; paid: number }> = ({ title, balance, cost, paid }) => {
  return (
    <div className="flex flex-col justify-evenly gap-2">
      <span className="text-xl font-semibold">{title}:</span>
      <div className="flex-1">
        <div className="flex items-start gap-2">
          <CurrencyItem value={balance} color={{ true: 'text-blue-400' }} />
        </div>
        <div className="flex gap-2">
          <CurrencyItem value={cost} color={{ true: 'text-red-400' }} />
        </div>
        <div className="flex gap-2">
          <CurrencyItem value={paid} color={{ condition: '<', true: 'text-green-400' }} />
        </div>
      </div>
    </div>
  );
};

function computeSummary(items: Transaction[]) {
  const groupedByMonth = Object.groupBy(items, (item) => getMonth(item.date));

  const values = Object.entries(groupedByMonth).map(([month, items]) => {
    const cost = sumItems(items?.filter((item) => Number.parseFloat(item.amount) > 0) ?? [], (item) =>
      Number.parseFloat(item.amount)
    );
    const paid = sumItems(items?.filter((item) => Number.parseFloat(item.amount) < 0) ?? [], (item) =>
      Number.parseFloat(item.amount)
    );
    const balance = cost + paid;
    return {
      month,
      cost,
      paid,
      balance
    };
  });

  const total = values.reduce(
    (acc, curr) => {
      return {
        cost: acc.cost + curr.cost,
        paid: acc.paid + curr.paid,
        balance: acc.balance + curr.balance
      };
    },
    { cost: 0, paid: 0, balance: 0 }
  );

  return {
    total,
    values
  };
}

const getRefDate = (ref: string) => {
  const [year, month] = ref.split('-');
  return new Date(+year, +month - 1);
};

const getDate = (month: string) => {
  return new Date(new Date().getFullYear(), +month);
};
