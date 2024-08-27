import { PizzaChart } from '@/components/PizzaChart';
import { formatCurrency } from '@/lib/utils';
import { useExpensesBalance, useIncomesBalance, useInvestmentsBalance, useRegisters } from '@/store/store';
import { TrendingDown, TrendingUp } from 'lucide-react';
import { useMemo } from 'react';

export function IncomesPieChart() {
  const [incomes] = useRegisters('incomes');
  const filtered = useMemo(() => incomes.filter((item) => item.checked), [incomes]);
  const balance = useIncomesBalance();
  const remain = balance.planned - balance.done;
  const data = filtered.length === 0 ? incomes : filtered;
  return (
    <PizzaChart key='incomes' data={data}>
      Remaining {formatCurrency(remain)}
      {remain >= 0 ? <TrendingUp className='h-4 w-4 mx-2' /> : <TrendingDown className='h-4 w-4 mx-2' />}
    </PizzaChart>
  );
}

export function ExpensesPieChart() {
  const [expenses] = useRegisters('expenses');
  const filtered = useMemo(() => expenses.filter((item) => item.checked), [expenses]);
  const balance = useExpensesBalance();
  const remain = balance.planned - balance.done;
  const data = filtered.length === 0 ? expenses : filtered;
  return (
    <PizzaChart key='expenses' data={data}>
      Remaining {formatCurrency(remain)}
      {remain >= 0 ? <TrendingUp className='h-4 w-4 mx-2' /> : <TrendingDown className='h-4 w-4 mx-2' />}
    </PizzaChart>
  );
}

export function InvestmentsPieChart() {
  const [investments] = useRegisters('investments');
  const filtered = useMemo(() => investments.filter((item) => item.checked), [investments]);
  const balance = useInvestmentsBalance();
  const remain = balance.planned - balance.done;
  const data = filtered.length === 0 ? investments : filtered;
  return (
    <PizzaChart key='investments' data={data}>
      Remaining {formatCurrency(remain)}
      {remain >= 0 ? <TrendingUp className='h-4 w-4 mx-2' /> : <TrendingDown className='h-4 w-4 mx-2' />}
    </PizzaChart>
  );
}
