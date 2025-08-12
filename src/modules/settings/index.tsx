import { SetClosingDay } from './features/set-closing-day';
import { SetGoals } from './features/set-goals';
import { SetLocalParams } from './features/set-local-params';

export const Settings = () => {
  return (
    <div className="mx-auto grid w-full items-start gap-6 md:grid-cols-2 mt-2 sm:mt-0">
      <SetGoals />
      <SetClosingDay />
      <SetLocalParams />
    </div>
  );
};
