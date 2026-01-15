import { CurrencyItem } from '@/components/currency-item';
import { FC } from 'react';
import { useTranslation } from 'react-i18next';

export const Budget: FC<{
  incomes: number;
  bills: number;
  remaining: number;
  incomesPerYear: number;
  billsPerYear: number;
  remainingPerYear: number;
}> = ({ incomes, bills, remaining, incomesPerYear, billsPerYear, remainingPerYear }) => {
  const { t } = useTranslation('translation', { keyPrefix: 'bills.summary' });
  return (
    <>
      <div className="flex flex-col gap-1 items-center">
        <span className="font-medium hidden sm:inline">{t('incomes')}</span>
        <CurrencyItem value={incomes} className="text-lg font-semibold" />
        <CurrencyItem title={t('yearly')} value={incomesPerYear} className="text-xs font-semibold" />
      </div>
      <div className="flex flex-col gap-1 items-center">
        <span className="font-medium hidden sm:inline">{t('bills')}</span>
        <CurrencyItem value={bills} className="text-lg font-semibold" prefix="-" color={{ true: 'text-red-400' }} />
        <CurrencyItem
          title={t('yearly')}
          value={billsPerYear}
          className="text-xs font-semibold"
          prefix="-"
          color={{ true: 'text-red-400' }}
        />
      </div>
      <div className="flex flex-col gap-1 items-center">
        <span className="font-medium hidden sm:inline">{t('remaining')}</span>
        <CurrencyItem value={remaining} className="text-lg font-semibold" color={{ true: 'text-sky-400' }} />
        <CurrencyItem
          title={t('yearly')}
          value={remainingPerYear}
          className="text-xs font-semibold"
          color={{ true: 'text-sky-400' }}
        />
      </div>
    </>
  );
};
