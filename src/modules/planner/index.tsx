import { Toaster } from '@/components/ui/sonner';
import { Calculator } from '@rafalino/react-quick-calculator';
import { ExpensesBalanceCard, IncomesBalanceCard, InvestmentsBalanceCard, TotalBalance } from './features/balance';
import { GoalCard } from './features/goal-card';
import { ProjectionDialog } from './features/projection-dialog';
import { ExpensesPieChart, IncomesPieChart, InvestmentsPieChart } from './features/register-pie-charts';
import RegisterTabs from './features/tabs/tabs';

const relativePositionX = window.innerWidth * 0.58;
const relativePositionY = window.innerHeight * 0.13;

export const Planner = () => {
  return (
    <>
      <Calculator x={relativePositionX} y={relativePositionY} className="hidden sm:block" />
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
      <div>
        <IncomesPieChart />
        <ExpensesPieChart />
        <InvestmentsPieChart />
      </div>
    </>
  );
};
