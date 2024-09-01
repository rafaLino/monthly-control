import { SetClosingDay } from '@/features/SetClosingDay';
import { SetGoals } from '@/features/SetGoals';
import { createLazyFileRoute } from '@tanstack/react-router';
export const Route = createLazyFileRoute('/_main/settings')({
  component: Index,
});

function Index() {
  return (
    <div className="flex min-h-screen w-full flex-col">
      <main className="flex min-h-[calc(100vh_-_theme(spacing.16))] flex-1 flex-col gap-4 p-4 md:gap-4 md:p-6">
        <div className="mx-auto grid w-full items-start gap-6 md:grid-cols-[280px_1fr] lg:grid-cols-[250px_1fr]">
          <div />
          <div className="grid gap-6 w-full sm:max-w-3xl">
            <SetGoals />
            <SetClosingDay />
          </div>
        </div>
      </main>
    </div>
  );
}
