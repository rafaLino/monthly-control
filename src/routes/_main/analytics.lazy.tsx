import { DataAnalysis } from '@/modules/data-analysis/data-analysis';
import { createLazyFileRoute } from '@tanstack/react-router';
export const Route = createLazyFileRoute('/_main/analytics')({
  component: Index
});

function Index() {
  return (
    <main className="grid flex-1 items-start gap-4 p-2 sm:py-0 md:gap-8">
      <div className="flex flex-1 flex-col gap-4 p-1 sm:p-4 md:gap-4 md:p-6">
        <DataAnalysis />
      </div>
    </main>
  );
}
