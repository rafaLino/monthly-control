import { QueryKeys } from '@/types/queryKeys';
import { useMutation, useQuery } from '@tanstack/react-query';
import { getFundParam, saveFundParam } from '../features/summary/helpers/fetches';

export function useFundQuery() {
  const { data, refetch } = useQuery({
    queryKey: [QueryKeys.emergencyFund],
    queryFn: getFundParam
  });

  const { mutateAsync } = useMutation({
    mutationKey: [QueryKeys.emergencyFund],
    mutationFn: saveFundParam,
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
