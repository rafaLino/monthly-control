import { formatCurrency } from '@/lib/utils';
import { memo } from 'react';
import { Card, CardHeader, CardTitle } from '../ui/card';

type BalanceCardProps = {
  incomesBalance: number | undefined;
  incomesDone: number | undefined;
  expensesBalance: number | undefined;
  expensesDone: number | undefined;
};

export const BalanceCard: React.FC<BalanceCardProps> = memo(
  ({ incomesDone, incomesBalance, expensesDone, expensesBalance }) => {
    return (
      <Card className={'sm:col-span-2'}>
        <div className={'flex justify-between'}>
          <CardHeader className='flex flex-col gap-2'>
            <CardTitle className='text-gray-500'>Incomes</CardTitle>
            <div className='flex flex-row sm:gap-1'>
              <span>Balance: </span>
              <CardTitle className='text-base'>{formatCurrency(incomesBalance)}</CardTitle>
            </div>

            <div className='flex flex-row sm:gap-1'>
              <span>Done: </span>
              <CardTitle className='text-base'>{formatCurrency(incomesDone)}</CardTitle>
            </div>
          </CardHeader>
          <CardHeader className='flex flex-col gap-2'>
            <CardTitle className='text-gray-500'>Expenses</CardTitle>
            <div className='flex flex-row sm:gap-1'>
              <span>Balance: </span>
              <CardTitle className='text-base'>{formatCurrency(expensesBalance)}</CardTitle>
            </div>

            <div className='flex flex-row sm:gap-1'>
              <span>Done: </span>
              <CardTitle className='text-base'>{formatCurrency(expensesDone)}</CardTitle>
            </div>
          </CardHeader>
        </div>
      </Card>
    );
  }
);
