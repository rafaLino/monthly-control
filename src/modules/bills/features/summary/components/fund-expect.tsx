import { CurrencyItem } from '@/components/currency-item';
import { PopoverInput } from '@/modules/bills/components/popover-input';
import { FC, ReactNode, useEffect, useState } from 'react';
import { useTranslation } from 'react-i18next';

export const FundExpect: FC<{
  billsPerYear: number;
  fund: number;
  syncing?: boolean;
  children?: (value: number) => ReactNode;
}> = ({ billsPerYear, fund, children }) => {
  const { t } = useTranslation('translation', { keyPrefix: 'bills.summary' });
  const [fundValue, setFundValue] = useState(fund);
  useEffect(() => {
    setFundValue(fund);
  }, [fund]);
  return (
    <>
      <div className="flex flex-col items-center">
        <div className="flex flex-col items-center justify-center w-full">
          <div className="flex items-center w-full justify-center gap-x-4">
            <CurrencyItem
              title={t('current')}
              value={fundValue / 12}
              className="text-[10px] font-semibold"
              color={{ true: 'text-amber-400' }}
            />
            <CurrencyItem
              title={t('ideal')}
              value={billsPerYear / 12}
              className="text-[10px] font-semibold"
              color={{ true: 'text-sky-400' }}
            />
          </div>
          <div className="flex flex-row gap-x-2">
            <PopoverInput value={fundValue} onChange={setFundValue}>
              <span className="text-lg font-medium">{t('currency', { value: fundValue, keyPrefix: '' })}</span>
            </PopoverInput>
            {children?.(fundValue)}
          </div>
        </div>
      </div>

      <div className="col-start-3 flex flex-col justify-center items-center">
        <CurrencyItem value={fund - billsPerYear} className="text-lg font-semibold" />
      </div>
    </>
  );
};
