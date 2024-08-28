import { SummarizedCard } from '@/components/SummarizedCard';
import { useInvestmentsBalance } from '@/store/store';
import { useTranslation } from 'react-i18next';

export function InvestmentsBalanceCard() {
  const { t } = useTranslation();
  const { planned, done } = useInvestmentsBalance();

  return (
    <SummarizedCard
      color='yellow'
      plannedLabel={t('investmentsBalanceCard.planned')}
      doneLabel={t('investmentsBalanceCard.done')}
      planned={t('currency', { value: planned })}
      realized={t('currency', { value: done })}
    />
  );
}
