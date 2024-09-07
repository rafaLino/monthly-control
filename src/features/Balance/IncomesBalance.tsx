import { SummarizedCard } from '@/components/summarized-card';
import { useIncomesBalance } from '@/store/store';
import { useTranslation } from 'react-i18next';

export function IncomesBalanceCard() {
  const { t } = useTranslation();
  const { planned, done } = useIncomesBalance();

  return (
    <SummarizedCard
      color="green"
      plannedLabel={t('incomesBalanceCard.planned')}
      doneLabel={t('incomesBalanceCard.done')}
      planned={t('currency', { value: planned })}
      realized={t('currency', { value: done })}
    />
  );
}
