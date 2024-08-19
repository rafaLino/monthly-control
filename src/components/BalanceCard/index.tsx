import { formatCurrency } from '@/lib/utils';
import { Card, CardDescription, CardHeader, CardTitle } from '../ui/card';

type BalanceCardProps = {
  incomes: number | undefined;
  expenses: number | undefined;
};

export const BalanceCard: React.FC<BalanceCardProps> = ({ incomes, expenses }) => {
  const balance = (incomes ?? 0) - (expenses ?? 0);
  return (
    <Card className={'sm:col-span-2'}>
      <div className={'flex justify-around items-center h-full'}>
        <CardHeader className='flex flex-col gap-2'>
          <CardDescription>Incomes</CardDescription>
          <CardTitle className='text-base'>{formatCurrency(incomes)}</CardTitle>
        </CardHeader>
        <CardHeader className='flex flex-col gap-2'>
          <CardDescription>Expenses</CardDescription>
          <CardTitle className='text-base'>{formatCurrency(expenses)}</CardTitle>
        </CardHeader>
        <CardHeader className='flex flex-col gap-2'>
          <CardDescription>Balance</CardDescription>
          <CardTitle className='text-base'>{formatCurrency(balance)}</CardTitle>
        </CardHeader>
      </div>
    </Card>
  );
};
