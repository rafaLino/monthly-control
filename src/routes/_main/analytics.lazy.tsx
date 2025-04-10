import { DataAnalysis } from '@/modules/data-analysis/data-analysis';
import { createLazyFileRoute } from '@tanstack/react-router';
export const Route = createLazyFileRoute('/_main/analytics')({
  component: Index,
});

function Index() {
  return (
    <div className="flex w-full flex-col">
      <main className="flex w-full items-center flex-col gap-4 mt-8 px-4 sm:p-2 md:gap-4 md:p-4">
        <DataAnalysis />
      </main>
    </div>
  );
}
