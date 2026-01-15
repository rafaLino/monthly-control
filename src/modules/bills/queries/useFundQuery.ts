import { QueryKeys } from '@/types/queryKeys';
import { useMutation, useQuery } from '@tanstack/react-query';
import { billsService } from '../services/bills.service';

export function useFundQuery() {
  const { data, refetch } = useQuery({
    queryKey: [QueryKeys.emergencyFund],
    queryFn: billsService.getFundParam
  });

  const { mutateAsync } = useMutation({
    mutationKey: [QueryKeys.emergencyFund],
    mutationFn: billsService.setFundParam,
    onSuccess: (_, newFund, __, context) => {
      context.client.setQueryData([QueryKeys.emergencyFund], newFund);
    }
  });

  const sync = async (action: 'download' | 'upload', fund: number) => {
    if (action === 'upload') {
      await mutateAsync(fund);
      return;
    }

    refetch();
  };

  return {
    fund: data ?? 0,
    sync
  };
}
