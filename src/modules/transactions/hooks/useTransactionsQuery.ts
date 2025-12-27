import { fileService } from '@/services/files.service';
import { QueryKeys } from '@/types/queryKeys';
import { TRefDate } from '@/types/refDate';
import { useQuery } from '@tanstack/react-query';
import { Dispatch, SetStateAction, useEffect } from 'react';
import { Transaction } from '../types/transaction';
import { normalizeTransactions } from '../utils/normalize-transactions';

type Props = {
  ref: TRefDate | null;
  setTransactions: Dispatch<SetStateAction<Transaction[]>>;
};
export function useTransactionsQuery({ ref, setTransactions }: Props) {
  const { data, isFetched, isLoading } = useQuery({
    queryKey: [QueryKeys.transactions, ref],
    queryFn: () => fileService.download(ref!),
    enabled: !!ref
  });

  useEffect(() => {
    if (data) {
      setTransactions(normalizeTransactions(data));
    }
  }, [isFetched, data]);

  return isLoading;
}
