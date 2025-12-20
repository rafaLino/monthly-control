import { Toaster } from '@/components/ui/sonner';
import { Suspense, lazy } from 'react';
import { ExpensesBalanceCard, IncomesBalanceCard, InvestmentsBalanceCard, TotalBalance } from './features/balance';
import { GoalCard } from './features/goal-card';
import { ProjectionDialog } from './features/projection-dialog';
import { PieChartsSkeleton } from './features/register-pie-charts/pie-charts-skeleton';
import RegisterTabs from './features/tabs/tabs';


const IncomesPieChart = lazy(() =>
  import('./features/register-pie-charts').then((module) => ({ default: module.IncomesPieChart }))
);
const ExpensesPieChart = lazy(() =>
  import('./features/register-pie-charts').then((module) => ({ default: module.ExpensesPieChart }))
);
const InvestmentsPieChart = lazy(() =>
  import('./features/register-pie-charts').then((module) => ({ default: module.InvestmentsPieChart }))
);

export const Planner = () => {
  return (
    <>
      <ProjectionDialog />
      <div className="grid auto-rows-max items-start gap-2 md:gap-4 lg:col-span-2">
        <div className="grid gap-2 sm:gap-0 sm:gap-x-2 sm:grid-cols-2 md:grid-cols-4 lg:grid-cols-2 xl:grid-cols-4">
          <TotalBalance />
          <GoalCard />
          <Toaster />
        </div>
        <div className="grid gap-4 sm:grid-cols-2 md:grid-cols-3 lg:grid-cols-2 xl:grid-cols-3">
          <IncomesBalanceCard />
          <ExpensesBalanceCard />
          <InvestmentsBalanceCard />
        </div>
        <RegisterTabs />
      </div>
      <div className="flex flex-col gap-y-1 xl:gap-y-2.5">
        <Suspense fallback={<PieChartsSkeleton />}>
          <IncomesPieChart />
          <ExpensesPieChart />
          <InvestmentsPieChart />
        </Suspense>
      </div>
    </>
  );
};
