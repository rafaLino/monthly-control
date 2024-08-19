import { SummarizedCard } from '@/components/SummarizedCard';
import { useExpensesBalance } from '@/store/store';

export function ExpensesBalanceCard() {
  const { planned, done } = useExpensesBalance();

  return <SummarizedCard color='red' planned={planned} realized={done} />;
}
