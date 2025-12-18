import { Planner } from '@/modules/planner';
import { load } from '@/store';
import { createFileRoute } from '@tanstack/react-router';

export const Route = createFileRoute('/_main/')({
  component: Index,
  loader: () => load(),
  shouldReload: false
});

function Index() {
  return (
    <>
      <main className="grid flex-1 items-start gap-4 p-2 sm:py-0 md:gap-8 lg:grid-cols-3 xl:grid-cols-3">
        <Planner />
      </main>
    </>
  );
}
