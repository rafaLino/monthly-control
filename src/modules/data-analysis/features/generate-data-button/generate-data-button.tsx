import { Button } from '@/components/ui/button';
import { useLocalStorage } from '@/hooks/useLocalStorage';
import { cn } from '@/lib/utils';
import { useMutation, useQuery } from '@tanstack/react-query';
import { addDays, isPast } from 'date-fns';
import { CirclePause } from 'lucide-react';
import { useTranslation } from 'react-i18next';
import { createMetadata, fetchGeneratedMetadataTimestamp } from '../../utils/data-analysis.service';

/**
 * https://date-fns.org/v4.1.0/docs/format
 * e.g: 24 de setembro de 2024 às 01:40am
 */
const DATE_FORMAT = 'PPPpaaa';

function isAllowedForGenerateCsv(lastTimeGeneratedData: Date | undefined, days: number) {
  if (!lastTimeGeneratedData) return true;
  const date = addDays(lastTimeGeneratedData, days);
  return isPast(date);
}

export const GenerateDataButton = () => {
  const { t } = useTranslation();
  const [days] = useLocalStorage('default_waiting_time_for_generate_csv', 10);

  const { data, isFetching } = useQuery({
    queryKey: ['generated-metadata-timestamp'],
    queryFn: fetchGeneratedMetadataTimestamp,
  });

  const { mutate, isPending } = useMutation({ mutationFn: createMetadata });

  const disabled = isPending || isFetching || !isAllowedForGenerateCsv(data, days);

  return (
    <div>
      <Button
        variant={isPending ? 'destructive' : 'default'}
        size='default'
        className={cn('flex items-center gap-2 relative', isPending && 'animate-pulse')}
        onClick={() => mutate()}
        disabled={disabled}
      >
        Generate data
        {isPending && <CirclePause className='h-4 w-4' />}
      </Button>
      {data && <span className='text-[10px]'>{t('date', { date: data, context: { format: DATE_FORMAT } })}</span>}
    </div>
  );
};
