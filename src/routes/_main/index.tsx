import { ExpensesBalanceCard, IncomesBalanceCard, InvestmentsBalanceCard, TotalBalance } from '@/features/Balance';
import { GoalCard } from '@/features/GoalCard';
import { ExpensesPieChart, IncomesPieChart, InvestmentsPieChart } from '@/features/RegisterPieCharts';
import RegisterTabs from '@/features/Tabs/Tabs';
import { load } from '@/store/store';
import { Calculator } from '@rafael-lino/react-quick-calculator';
import { createFileRoute } from '@tanstack/react-router';
export const Route = createFileRoute('/_main/')({
  component: Index,
  loader: () => load()
});

function Index() {
  return (
    <main className="grid flex-1 items-start gap-4 p-2 sm:py-0 md:gap-8 lg:grid-cols-3 xl:grid-cols-3">
      <div className="grid auto-rows-max items-start gap-4 md:gap-8 lg:col-span-2">
        <div className="grid gap-4 sm:grid-cols-2 md:grid-cols-4 lg:grid-cols-2 xl:grid-cols-4">
          <TotalBalance />
          <GoalCard />
        </div>
        <div className="grid gap-4 sm:grid-cols-2 md:grid-cols-3 lg:grid-cols-2 xl:grid-cols-3">
          <IncomesBalanceCard />
          <ExpensesBalanceCard />
          <InvestmentsBalanceCard />
        </div>
        <RegisterTabs />
      </div>
      <div>
        <div className="hidden sm:block relative">
          <Calculator className="right-3/4 top-20" />
        </div>
        <IncomesPieChart />
        <ExpensesPieChart />
        <InvestmentsPieChart />
      </div>
    </main>
  );
}
