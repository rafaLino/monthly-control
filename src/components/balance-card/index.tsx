import { memo } from 'react';
import { useTranslation } from 'react-i18next';
import { Card, CardHeader, CardTitle } from '../ui/card';

type BalanceCardProps = {
  incomesBalance: number | undefined;
  incomesDone: number | undefined;
  expensesBalance: number | undefined;
  expensesDone: number | undefined;
};

export const BalanceCard: React.FC<BalanceCardProps> = memo(
  ({ incomesDone, incomesBalance, expensesDone, expensesBalance }) => {
    const { t } = useTranslation();
    return (
      <Card className={'sm:col-span-2'}>
        <div className={'flex justify-evenly sm:justify-between'}>
          <CardHeader className="flex flex-col gap-2">
            <CardTitle className="text-gray-500">{t('balanceCard.incomes')}</CardTitle>
            <div className="flex flex-col sm:flex-row sm:gap-1">
              <span>{t('balanceCard.balance')}</span>
              <CardTitle className="text-base">{t('currency', { value: incomesBalance })}</CardTitle>
            </div>

            <div className="flex flex-col sm:flex-row sm:gap-1">
              <span>{t('balanceCard.done')}</span>
              <CardTitle className="text-base">{t('currency', { value: incomesDone })}</CardTitle>
            </div>
          </CardHeader>
          <CardHeader className="flex flex-col gap-2">
            <CardTitle className="text-gray-500">{t('balanceCard.expenses')}</CardTitle>
            <div className="flex flex-col sm:flex-row sm:gap-1">
              <span>{t('balanceCard.total')}</span>
              <CardTitle className="text-base">{t('currency', { value: expensesBalance })}</CardTitle>
            </div>

            <div className="flex flex-col sm:flex-row sm:gap-1">
              <span>{t('balanceCard.done')}</span>
              <CardTitle className="text-base">{t('currency', { value: expensesDone })}</CardTitle>
            </div>
          </CardHeader>
        </div>
      </Card>
    );
  }
);
