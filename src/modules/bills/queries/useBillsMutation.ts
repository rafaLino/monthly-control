import { generateId, replaceItemOfArray } from '@/lib/utils';
import { QueryKeys } from '@/types/queryKeys';
import { useMutation, useSuspenseQuery } from '@tanstack/react-query';
import { MouseEvent } from 'react';
import { billsService } from '../services/bills.service';
import { Bill } from '../types';

export function useBillsQuery() {
  const { data } = useSuspenseQuery({
    queryKey: [QueryKeys.bills],
    queryFn: billsService.get
  });

  const { mutateAsync: saveBill } = useMutation({
    mutationFn: billsService.save,
    onMutate: (data, context) => {
      const previous = context.client.getQueryData([QueryKeys.bills]) as Bill[];
      context.client.setQueryData([QueryKeys.bills], [...previous, data]);
      return { previous };
    },
    onError: (_, __, result, context) => {
      context.client.setQueryData([QueryKeys.bills], result?.previous);
    }
  });

  const { mutateAsync: updateBill } = useMutation({
    mutationFn: billsService.update,
    onMutate: (data, context) => {
      const previous = context.client.getQueryData([QueryKeys.bills]) as Bill[];
      context.client.setQueryData(
        [QueryKeys.bills],
        replaceItemOfArray(previous, data, (item) => item.id === data.id)
      );
      return { previous };
    },
    onError: (_, __, result, context) => {
      context.client.setQueryData([QueryKeys.bills], result?.previous);
    }
  });

  const { mutateAsync: removeBill } = useMutation({
    mutationFn: billsService.remove,
    onMutate: (id, context) => {
      const previous = context.client.getQueryData([QueryKeys.bills]) as Bill[];
      context.client.setQueryData(
        [QueryKeys.bills],
        previous.filter((bill) => bill.id !== id)
      );
      return { previous };
    },
    onError: (_, __, result, context) => {
      context.client.setQueryData([QueryKeys.bills], result?.previous);
    }
  });

  const save = async (title: string, amount: number) => {
    return saveBill({
      id: generateId(),
      title,
      amount,
      tags: []
    });
  };

  const remove = async (event: MouseEvent<HTMLButtonElement>) => {
    const id = event.currentTarget.dataset.id as string;
    return removeBill(id);
  };

  return [data, save, updateBill, remove] as const;
}
