import { fileService } from '@/services/files.service';
import { QueryKeys } from '@/types/queryKeys';
import { TRefDate } from '@/types/refDate';
import { useQuery } from '@tanstack/react-query';
import { useEffect } from 'react';
import { Transaction } from '../types/transaction';
import { normalizeTransactions } from '../utils';

export function useTransactionsQuery(ref: TRefDate | null, onSuccess?: (data: Transaction[]) => void) {
  const { data, isLoading } = useQuery({
    enabled: !!ref,
    queryKey: [QueryKeys.transactions, ref],
    queryFn: () => fileService.download(ref!),
    select: (data) => data && normalizeTransactions(data)
  });

  useEffect(() => {
    if (data) {
      onSuccess?.(data);
    }
  }, [data]);

  return isLoading;
}
