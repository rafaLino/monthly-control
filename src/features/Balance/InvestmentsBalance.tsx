import { SummarizedCard } from '@/components/SummarizedCard';
import { useInvestmentsBalance } from '@/store/store';

export function InvestmentsBalanceCard() {
  const { planned, done } = useInvestmentsBalance();

  return <SummarizedCard color='yellow' planned={planned} realized={done} />;
}
