import { BalanceCard } from '@/components/BalanceCard';
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
