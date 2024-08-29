import { BalanceCard } from '@/components/balance-card';
import { useTotalBalance } from '@/store/store';

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
