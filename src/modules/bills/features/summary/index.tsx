import { CurrencyItem } from '@/components/currency-item';
import { Percent } from 'lucide-react';
import { FC, useState } from 'react';
import { useTranslation } from 'react-i18next';
import { useBills } from '../../context/hooks/useBills';
import { User } from '../../types';

export const BillsSummary: FC<{
  users: User[];
}> = ({ users }) => {
  const { t } = useTranslation('translation');
  const { percentage, remaining, bills, incomes, incomesPerYear, billsPerYear, remainingPerYear, calculateUserShare } =
    useBills();
  const [fund] = useState<number>(150000);
  return (
    <div className="grid grid-cols-3 row-span-3 gap-4 px-2 justify-between text-zinc-600 dark:text-zinc-300">
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

      <hr className="col-span-3 w-full" />

      <div
        title="How much fixed expenses affect your budget"
        className="flex flex-col gap-2 items-center justify-center text-amber-600"
      >
        <Percent className="size-4" />
        <span className="font-medium">{t('percentage', { value: percentage })}</span>
      </div>
      <div className="col-span-2 flex justify-around w-full gap-1 items-center">
        {users.map((user) => (
          <div key={user.id} className="flex flex-col gap-1 ">
            <span className="font-medium text-xs text-amber-400">{user.name}</span>
            <CurrencyItem value={calculateUserShare(user)} color={{ true: 'text-amber-400' }} />
          </div>
        ))}
      </div>

      <hr className="col-span-3 w-full" />

      <div className="flex flex-col items-center relative">
        <span title="Fund" className="text-lg font-medium">
          {t('currency', { value: fund })}
        </span>
        <div className="flex justify-around gap-1 w-full absolute -bottom-2 sm:-bottom-4">
          <CurrencyItem
            title="Current"
            value={fund / 12}
            className="text-[10px] font-semibold"
            color={{ true: 'text-amber-400' }}
          />
          <CurrencyItem
            title="Ideal"
            value={billsPerYear / 12}
            className="text-[10px] font-semibold"
            color={{ true: 'text-sky-400' }}
          />
        </div>
      </div>

      <div className="col-start-3 flex flex-col justify-center items-center">
        <CurrencyItem value={fund - billsPerYear} className="text-lg font-semibold" />
      </div>
    </div>
  );
};
