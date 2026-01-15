import { CurrencyItem } from '@/components/currency-item';
import { Input } from '@/components/ui/input';
import { Popover, PopoverContent, PopoverTrigger } from '@/components/ui/popover';
import { useOnEnter } from '@/hooks/useOnEnter';
import { FC, PropsWithChildren, ReactNode, useEffect, useState } from 'react';
import { useTranslation } from 'react-i18next';

export const FundExpect: FC<{
  billsPerYear: number;
  fund: number;
  syncing?: boolean;
  children?: (value: number) => ReactNode;
}> = ({ billsPerYear, fund, children }) => {
  const [fundValue, setFundValue] = useState(fund);
  useEffect(() => {
    setFundValue(fund);
  }, [fund]);
  return (
    <>
      <div className="flex flex-col items-center">
        <div className="flex flex-col items-center justify-center w-full">
          <div className='flex items-center w-full justify-center gap-x-4'>
            <CurrencyItem
              title="Current"
              value={fundValue / 12}
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
          <div className="flex flex-row gap-x-2">
            <FundPopover value={fundValue} onChange={setFundValue} />
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

const FundPopover: FC<PropsWithChildren<{
  value?: number;
  onChange?: (fund: number) => void;
}>> = ({ value = 0, onChange }) => {
  const { t } = useTranslation('translation');
  const [open, setOpen] = useState(false);

  const handleEnter = useOnEnter((e) => {
    setOpen(false);
    onChange?.(Number((e.target as HTMLInputElement).value));
  })

  return (
    <Popover open={open} onOpenChange={setOpen}>
      <PopoverTrigger asChild>
        <span title="Fund" className="text-lg font-medium">
          {t('currency', { value })}
        </span>
      </PopoverTrigger>
      <PopoverContent>
        <div className="flex flex-wrap gap-2">
          <Input name="fund" defaultValue={value} onKeyDown={handleEnter} className="w-full" />
        </div>
      </PopoverContent>
    </Popover >
  );
};