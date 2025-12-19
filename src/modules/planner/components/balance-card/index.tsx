import { Card, CardHeader, CardTitle } from '@/components/ui/card';
import { memo } from 'react';
import { useTranslation } from 'react-i18next';
import { Item } from './item';

type BalanceCardProps = {
  incomesBalance: number;
  incomesDone: number;
  expensesBalance: number;
  expensesDone: number;
};

export const BalanceCard: React.FC<BalanceCardProps> = memo(({ incomesDone, incomesBalance, expensesDone, expensesBalance }) => {
  const { t } = useTranslation('translation', { keyPrefix: 'balanceCard' });
  return (
    <Card className={'sm:col-span-2'}>
      <div className={'flex justify-evenly sm:justify-between'}>
        <CardHeader className="flex flex-col gap-4">
          <CardTitle className="text-gray-500">{t('incomes')}</CardTitle>
          <div className="flex flex-col sm:flex-row sm:gap-1">
            <span className="font-semibold">{t('balance')}</span>
            <Item testid="balance_card:balance" value={incomesBalance} color={incomesBalance < 0 ? 'red' : 'green'} />
          </div>

          <div className="flex flex-col sm:flex-row sm:gap-1">
            <span className="font-semibold">{t('done')}</span>
            <Item testid="balance_card:done" value={incomesDone} color={incomesDone < 0 ? 'red' : 'green'} />
          </div>
        </CardHeader>
        <CardHeader className="flex flex-col gap-4">
          <CardTitle className="text-gray-500">{t('expenses')}</CardTitle>
          <div className="flex flex-col sm:flex-row sm:gap-1">
            <span className="font-semibold">{t('total')}</span>
            <Item testid="balance_card:cost" value={expensesBalance} color="red" />
          </div>

          <div className="flex flex-col sm:flex-row sm:gap-1">
            <span className="font-semibold">{t('done')}</span>
            <Item testid="balance_card:cost_done" value={expensesDone} color="red" />
          </div>
        </CardHeader>
      </div>
    </Card>
  );
});
BalanceCard.displayName = 'BalanceCard';
