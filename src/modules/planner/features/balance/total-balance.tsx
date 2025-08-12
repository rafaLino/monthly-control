import { BalanceCard } from '@/modules/planner/components/balance-card';
import { useTotalBalance } from '@/store';

export function TotalBalance() {
  const [incomes, expenses] = useTotalBalance();
  return (
    <BalanceCard
      incomesBalance={incomes.balance}
      incomesDone={incomes.done}
      expensesBalance={expenses.balance}
      expensesDone={expenses.done}
    />
  );
}
