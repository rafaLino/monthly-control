import { fileService } from '@/services/files.service';
import { QueryKeys } from '@/types/queryKeys';
import { FileReponseData, TRefDate } from '@/types/refDate';
import { useMutation, useQuery } from '@tanstack/react-query';

const ONE_HOUR = 1000 * 60 * 60;

export function useFilesQuery(onSettledCallback?: () => void) {
  const { data, isLoading, refetch } = useQuery({
    queryKey: [QueryKeys.files],
    queryFn: () => fileService.getAll(),
    staleTime: ONE_HOUR
  });

  const { mutateAsync: save, isPending: isSaving } = useMutation({
    mutationFn: (data: { ref: TRefDate; csv: string }) => fileService.save(data.ref, data.csv),
    onMutate: (data, context) => {
      const previous = context.client.getQueryData([QueryKeys.files]) as FileReponseData[];
      context.client.setQueryData([QueryKeys.files], [...previous, { ref: data.ref }]);
      return { previous };
    },
    onSettled: (_, error, __, result, context) => {
      if (error) {
        context.client.setQueryData([QueryKeys.files], result?.previous);
        return;
      }

      onSettledCallback?.();
    }
  });

  return {
    data,
    isLoading,
    isSaving,
    refetch,
    save
  };
}
