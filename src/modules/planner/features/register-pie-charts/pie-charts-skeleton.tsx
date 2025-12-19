import { Skeleton } from '@/components/ui/skeleton';

export const PieChartsSkeleton = () => {
  return (
    <div className="flex flex-col gap-4">
      <Skeleton className="h-[274px] w-[442]px rounded-md" />
      <Skeleton className="h-[274px] w-[442]px rounded-md" />
      <Skeleton className="h-[274px] w-[442]px rounded-md" />
    </div>
  );
};
