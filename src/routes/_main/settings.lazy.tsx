import { Settings } from '@/modules/settings';
import { createLazyFileRoute } from '@tanstack/react-router';
export const Route = createLazyFileRoute('/_main/settings')({
  component: Index
});

function Index() {
  return (
    <div className="flex w-full flex-col">
      <main className="flex flex-1 flex-col gap-4 px-4 sm:p-4 md:gap-4 md:p-6">
        <Settings />
      </main>
    </div>
  );
}
