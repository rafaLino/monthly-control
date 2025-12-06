import { BalanceCard } from '@/modules/planner/components/balance-card';
import { useTotalBalance } from '@/store';

export function TotalBalance() {
  const { balance, balanceDone, cost, costDone } = useTotalBalance();

  return <BalanceCard incomesBalance={balance} incomesDone={balanceDone} expensesBalance={cost} expensesDone={costDone} />;
}
