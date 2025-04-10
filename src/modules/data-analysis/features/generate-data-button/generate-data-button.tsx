import { Button } from '@/components/ui/button';
import { cn } from '@/lib/utils';
import { useMutation, useQuery, useQueryClient } from '@tanstack/react-query';
import { addDays, isPast } from 'date-fns';
import { CirclePause } from 'lucide-react';
import { useTranslation } from 'react-i18next';
import { createMetadata, fetchGeneratedMetadataTimestamp } from '../../utils/data-analysis.logic';
import { QueryKeys } from '@/types/queryKeys';
import { useLocalParams } from '../../hooks/useLocalParams';


/**
 * https://date-fns.org/v4.1.0/docs/format
 * e.g: 24 de setembro de 2024 às 01:40am
 */
const DATE_FORMAT = 'PPPpaaa';

const oneDay = 1000 * 60 * 60 * 24;

function isAllowedForGenerateCsv(lastTimeGeneratedData: Date | null | undefined, days: number) {
  if (!lastTimeGeneratedData) return true;
  const date = addDays(lastTimeGeneratedData, days);
  return isPast(date);
}

export const GenerateDataButton = () => {
  const { t } = useTranslation();
  const [days] = useLocalParams<number>('default_waiting_time_for_generate_csv');
  const queryClient = useQueryClient();
  const query = useQuery({
    queryKey: [QueryKeys.generatedMetadataTimestamp],
    queryFn: fetchGeneratedMetadataTimestamp,
    staleTime: oneDay
  });

  const mutation = useMutation({
    mutationFn: createMetadata,
    onSuccess: (data) => {
      queryClient.setQueryData([QueryKeys.generatedMetadataTimestamp], Date.now());
      queryClient.setQueryData([QueryKeys.generateMetadata], data);
    },
  });

  const disabled = mutation.isPending || query.isFetching || !isAllowedForGenerateCsv(query.data, days);

  return (
    <div>
      <Button
        variant={mutation.isPending ? 'destructive' : 'default'}
        size='default'
        className={cn('flex items-center gap-2 relative', mutation.isPending && 'animate-pulse')}
        onClick={() => mutation.mutate()}
        disabled={disabled}
      >
        Generate data
        {mutation.isPending && <CirclePause className='h-4 w-4' />}
      </Button>
      {query.data && (
        <span className='text-[10px] absolute'>{t('date', { date: query.data, context: { format: DATE_FORMAT } })}</span>
      )}
    </div>
  );
};
