import { Skeleton } from '@/components/ui/skeleton';

export const DashboardSkeleton = () => {
  return (
    <div className="flex flex-col space-y-3 w-full">
      <Skeleton className="h-[600px] w-full rounded-xl bg-gray-200" />
    </div>
  );
};
