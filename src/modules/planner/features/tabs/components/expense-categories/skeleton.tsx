import { Separator } from '@/components/ui/separator';
import { Skeleton } from '@/components/ui/skeleton';

export function LoaderSkeleton() {
  return (
    <div className="p-4">
      <Skeleton className="h-4 w-10 rounded-lg mb-4" />
      <section className="px-4">
        <div className="flex justify-between gap-2">
          <Skeleton className="h-4 w-[250px]" />
          <Skeleton className="h-4 w-[250px]" />
        </div>
        <Separator className="my-2" />
      </section>
    </div>
  );
}
