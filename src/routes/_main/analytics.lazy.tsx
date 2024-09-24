import { createLazyFileRoute } from '@tanstack/react-router';
import { ExtractionLogs } from '@/features/Extraction/extraction-logs';
import { LastExtraction } from '@/features/Extraction/last-extraction';

export const Route = createLazyFileRoute('/_main/analytics')({
  component: Index
});

function Index() {
  return (
    <div className="flex min-h-screen w-full flex-col">
      <main className="flex min-h-[calc(100vh_-_theme(spacing.16))] w-full items-center flex-col gap-4 mt-12 px-4 sm:p-4 md:gap-4 md:p-6">
        <div className="grid gap-6 w-full justify-center md:max-w-3xl 2xl:max-w-5xl">
          <LastExtraction />
        </div>
        <ExtractionLogs />
      </main>
    </div>
  );
}
