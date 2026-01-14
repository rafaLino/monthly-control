import { CurrencyItem } from '@/components/currency-item';
import { FC } from 'react';

export const Budget: FC<{
  incomes: number;
  bills: number;
  remaining: number;
  incomesPerYear: number;
  billsPerYear: number;
  remainingPerYear: number;
}> = ({ incomes, bills, remaining, incomesPerYear, billsPerYear, remainingPerYear }) => {
  return (
    <>
      <div className="flex flex-col gap-1 items-center">
        <span className="font-medium">Incomes</span>
        <CurrencyItem value={incomes} className="text-lg font-semibold" />
        <CurrencyItem title="year" value={incomesPerYear} className="text-xs font-semibold" />
      </div>
      <div className="flex flex-col gap-1 items-center">
        <span className="font-medium">Bills</span>
        <CurrencyItem value={bills} className="text-lg font-semibold" prefix="-" color={{ true: 'text-red-400' }} />
        <CurrencyItem
          title="year"
          value={billsPerYear}
          className="text-xs font-semibold"
          prefix="-"
          color={{ true: 'text-red-400' }}
        />
      </div>
      <div className="flex flex-col gap-1 items-center">
        <span className="font-medium">Remaining</span>
        <CurrencyItem value={remaining} className="text-lg font-semibold" color={{ true: 'text-sky-400' }} />
        <CurrencyItem title="year" value={remainingPerYear} className="text-xs font-semibold" color={{ true: 'text-sky-400' }} />
      </div>
    </>
  );
};
