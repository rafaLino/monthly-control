import { FeatureFlags } from '@/features/FeatureFlags';
import { SetClosingDay } from '@/features/SetClosingDay';
import { SetGoals } from '@/features/SetGoals';
import { createLazyFileRoute } from '@tanstack/react-router';
export const Route = createLazyFileRoute('/_main/settings')({
  component: Index
});

function Index() {
  return (
    <div className="flex min-h-screen w-full flex-col">
      <main className="flex min-h-[calc(100vh_-_theme(spacing.16))] flex-1 flex-col gap-4 px-4 sm:p-4 md:gap-4 md:p-6">
        <div className="mx-auto grid w-full items-start gap-6 md:grid-cols-[180px_1fr] 2xl:grid-cols-[300px_1fr]">
          <div>
            <FeatureFlags />
          </div>
          <div className="grid gap-6 w-full md:max-w-3xl 2xl:max-w-5xl">
            <SetGoals />
            <SetClosingDay />
          </div>
        </div>
      </main>
    </div>
  );
}
