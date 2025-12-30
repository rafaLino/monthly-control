import { TransactionsPage } from '@/modules/transactions';
import { createLazyFileRoute } from '@tanstack/react-router';

export const Route = createLazyFileRoute('/_main/transactions')({
  component: Index
});

function Index() {
  return (
    <main className="grid flex-1 items-start gap-4 p-2 sm:py-0 md:gap-8">
      <div className="flex flex-1 flex-col gap-4 items-center p-1 sm:px-4 md:gap-4 h-full">
        <TransactionsPage />
      </div>
    </main>
  );
}
