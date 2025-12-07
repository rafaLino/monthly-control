import { Skeleton } from '@/components/ui/skeleton';

export const ProjectionSkeleton = () => {
  return (
    <div className="grid grid-cols-4 gap-4 py-4">
      <Skeleton className="h-full w-full" />
      <Skeleton className="h-full w-full" />
      <Skeleton className="h-full w-full" />
      <Skeleton className="h-full w-full" />
    </div>
  );
};
