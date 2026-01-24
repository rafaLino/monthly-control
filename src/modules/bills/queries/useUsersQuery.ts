import { QueryKeys } from '@/types/queryKeys';
import { useMutation, useSuspenseQuery } from '@tanstack/react-query';
import { billsService } from '../services/bills.service';
import { Status, User } from '../types';

export function useUsersQuery() {
  const { data } = useSuspenseQuery({
    queryKey: [QueryKeys.usersBills],
    queryFn: billsService.getUsers
  });

  const { mutateAsync: saveUser } = useMutation({
    mutationFn: billsService.saveUser,
    onSettled: (result, __, userData, ____, context) => {
      const previous = context.client.getQueryData<User[]>([QueryKeys.usersBills]) ?? [];
      context.client.setQueryData([QueryKeys.usersBills], [...previous, { ...userData, id: result?.toString() }]);
    }
  });

  const { mutateAsync: updateUser } = useMutation({
    mutationFn: billsService.updateUser,
    onMutate: (userData, context) => {
      const previous = context.client.getQueryData([QueryKeys.usersBills]) as User[];
      context.client.setQueryData(
        [QueryKeys.usersBills],
        previous.map((u) => (u.id === userData.id ? userData : u))
      );
      return { previous };
    },
    onError: (_, __, result, context) => {
      context.client.setQueryData([QueryKeys.usersBills], result?.previous);
    }
  });

  const { mutateAsync: removeUser } = useMutation({
    mutationFn: billsService.removeUser,
    onMutate: (id, context) => {
      const previous = context.client.getQueryData([QueryKeys.usersBills]) as User[];
      context.client.setQueryData(
        [QueryKeys.usersBills],
        previous.filter((u) => u.id !== id)
      );
      return { previous };
    },
    onError: (_, __, result, context) => {
      context.client.setQueryData([QueryKeys.usersBills], result?.previous);
    }
  });

  const save = async (_: Status, data: FormData): Promise<Status> => {
    const name = data.get('name') as string;
    const amount = Number(data.get('amount'));

    await saveUser({ name, amount });
    return 'success';
  };

  return [data, save, updateUser, removeUser] as const;
}
