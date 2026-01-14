import { CurrencyItem } from '@/components/currency-item';
import { Input } from '@/components/ui/input';
import { Popover, PopoverContent, PopoverTrigger } from '@/components/ui/popover';
import { isFalsy } from '@/lib/utils';
import { QueryKeys } from '@/types/queryKeys';
import { useQueryClient } from '@tanstack/react-query';
import { DownloadCloudIcon, UploadCloudIcon } from 'lucide-react';
import { FC, KeyboardEvent, useEffect, useState } from 'react';
import { useTranslation } from 'react-i18next';

export const FundExpect: FC<{
  billsPerYear: number;
  fund: number;
  onSync: (action: 'download' | 'upload', fund: number) => void;
}> = ({ billsPerYear, fund, onSync }) => {
  const [fundValue, setFundValue] = useState(fund);
  useEffect(() => {
    setFundValue(fund);
  }, [fund]);
  return (
    <>
      <div className="flex flex-col items-center relative">
        <FundPopover value={fundValue} onSync={onSync} onChange={setFundValue} />
        <div className="flex justify-around gap-1 w-full absolute -bottom-2 sm:-bottom-4">
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
      </div>

      <div className="col-start-3 flex flex-col justify-center items-center">
        <CurrencyItem value={fund - billsPerYear} className="text-lg font-semibold" />
      </div>
    </>
  );
};

const FundPopover: FC<{
  value?: number;
  onSync: (action: 'download' | 'upload', fund: number) => void;
  onChange?: (fund: number) => void;
}> = ({ value = 0, onSync, onChange }) => {
  const { t } = useTranslation('translation');
  const [open, setOpen] = useState(false);

  const handleEnter = (e: KeyboardEvent<HTMLInputElement>) => {
    if (e.code === 'Enter') {
      setOpen(false);
      onChange?.(Number((e.target as HTMLInputElement).value));
    }
  };

  return (
    <Popover open={open} onOpenChange={setOpen}>
      <div className="flex flex-row gap-x-2">
        <PopoverTrigger asChild>
          <span title="Fund" className="text-lg font-medium">
            {t('currency', { value })}
          </span>
        </PopoverTrigger>
        <SyncButton value={value} onClick={(action) => onSync(action, value)} />
      </div>
      <PopoverContent>
        <div className="flex flex-wrap gap-2">
          <Input name="fund" defaultValue={value} onKeyDown={handleEnter} className="w-full" />
        </div>
      </PopoverContent>
    </Popover>
  );
};

const SyncButton: FC<{
  value: number;
  onClick: (action: 'download' | 'upload') => void;
}> = ({ value, onClick }) => {
  const queryClient = useQueryClient();
  const cachedValue = queryClient.getQueryData<number>([QueryKeys.emergencyFund]);
  const action = checkValue(cachedValue, value);

  const handler = () => {
    if (action !== 'equal') {
      onClick(action);
    }
  };
  return (
    <button className="text-indigo-500" onClick={handler}>
      {renderIcon(action)}
    </button>
  );
};

const renderIcon = (comparison: 'equal' | 'download' | 'upload') => {
  switch (comparison) {
    case 'equal':
      return null;
    case 'upload':
      return <UploadCloudIcon className="size-4" />;
    case 'download':
      return <DownloadCloudIcon className="size-4" />;
  }
};

const checkValue = (cached: number | undefined, value: number) => {
  if (isFalsy(cached) || value === 0) return 'download';

  if (cached === value) return 'equal';

  return 'upload';
};
