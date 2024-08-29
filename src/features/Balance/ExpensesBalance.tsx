import { SummarizedCard } from '@/components/summarized-card';
import { useExpensesBalance } from '@/store/store';
import { useTranslation } from 'react-i18next';

export function ExpensesBalanceCard() {
  const { t } = useTranslation();
  const { planned, done } = useExpensesBalance();

  return (
    <SummarizedCard
      color='red'
      plannedLabel={t('expensesBalanceCard.planned')}
      doneLabel={t('expensesBalanceCard.done')}
      planned={t('currency', { value: planned })}
      realized={t('currency', { value: done })}
    />
  );
}
