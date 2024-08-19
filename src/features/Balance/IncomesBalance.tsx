import { SummarizedCard } from '@/components/SummarizedCard';
import { useIncomesBalance } from '@/store/store';

export function IncomesBalanceCard() {
  const { planned, done } = useIncomesBalance();

  return <SummarizedCard color='green' planned={planned} realized={done} />;
}
