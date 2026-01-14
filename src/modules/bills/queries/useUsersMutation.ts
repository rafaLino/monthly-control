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
        onSettled: (_, __, ___, ____, context) => {
            context.client.invalidateQueries({ queryKey: [QueryKeys.usersBills] });
        },
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
        const user = Object.fromEntries(data.entries()) as Partial<User>;

        await saveUser(user);
        return 'success';
    };

    return [data, save, removeUser] as const;
}
