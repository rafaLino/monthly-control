import { FC } from 'react';
import { useBills } from '../../context/hooks/useBills';
import { useFundQuery } from '../../queries/useFundQuery';
import { User } from '../../types';
import { Budget } from './components/budget';
import { FundExpect } from './components/fund-expect';
import { UsersShare } from './components/users-share';

export const BillsSummary: FC<{
  users: User[];
}> = ({ users }) => {
  const { percentage, remaining, bills, incomes, incomesPerYear, billsPerYear, remainingPerYear, calculateUserShare } =
    useBills();

  const { fund, sync } = useFundQuery();

  return (
    <div className="grid grid-cols-3 row-span-3 gap-4 px-2 justify-between text-zinc-600 dark:text-zinc-300">
      <Budget
        incomes={incomes}
        bills={bills}
        remaining={remaining}
        incomesPerYear={incomesPerYear}
        billsPerYear={billsPerYear}
        remainingPerYear={remainingPerYear}
      />

      <hr className="col-span-3 w-full" />

      <UsersShare users={users} percentage={percentage} calculateUserShare={calculateUserShare} />

      <hr className="col-span-3 w-full" />

      <FundExpect billsPerYear={billsPerYear} fund={fund} onSync={sync} />
    </div>
  );
};
