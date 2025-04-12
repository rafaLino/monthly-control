import { SetClosingDay } from '@/features/SetClosingDay';
import { SetGoals } from '@/features/SetGoals';
import { SetLocalParams } from '@/features/SetLocalParams';
import { createLazyFileRoute } from '@tanstack/react-router';
export const Route = createLazyFileRoute('/_main/settings')({
  component: Index,
});

function Index() {
  return (
    <div className='flex w-full flex-col'>
      <main className='flex flex-1 flex-col gap-4 px-4 sm:p-4 md:gap-4 md:p-6'>
        <div className='mx-auto grid w-full items-start gap-6 md:grid-cols-2 mt-2 sm:mt-0'>
          <SetGoals />
          <SetClosingDay />
          <SetLocalParams />
        </div>
      </main>
    </div>
  );
}
