import { Skeleton } from '@/components/ui/skeleton';

export const ChatSkeleton = () => {
  return (
    <div className="w-full h-full overflow-auto flex flex-col border rounded-lg p-2 pb-0 bg-slate-100 dark:bg-slate-700 text-zinc-500">
      <Skeleton className="flex flex-col w-full h-full rounded-lg bg-background px-2 py-4 gap-2 overflow-auto font-mono dark:text-zinc-100" />
      <Skeleton className="my-2 min-h-5 h-12" />
    </div>
  );
};
