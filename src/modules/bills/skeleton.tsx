import { Skeleton } from '@/components/ui/skeleton';

export const BillsModuleSkeleton = () => {
  return (
    <main className="grid grid-rows-1 grid-cols-1 h-full gap-4 p-2 sm:grid-cols-3 sm:grid-rows-3 sm:px-4 max-h-(--max-h-lg)">
      <Skeleton className="h-80 sm:h-205 p-2 row-span-1 sm:row-span-3 overflow-hidden flex flex-col" />
      <Skeleton className="p-2 " />
      <Skeleton className="p-2 " />
      <Skeleton className="p-2  col-span-1 row-span-1 sm:row-span-2 sm:col-span-2" />
    </main>
  );
};
