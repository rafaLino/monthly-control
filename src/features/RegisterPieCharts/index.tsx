import { PizzaChart } from '@/components/pizza-chart';
import { useExpensesBalance, useIncomesBalance, useInvestmentsBalance, useRegisters } from '@/store/store';
import { TrendingUp } from 'lucide-react';
import { useMemo } from 'react';
import { useTranslation } from 'react-i18next';

export function IncomesPieChart() {
  const { t } = useTranslation();
  const [incomes] = useRegisters('incomes');
  const filtered = useMemo(() => incomes.filter((item) => item.checked), [incomes]);
  const balance = useIncomesBalance();
  const remain = balance.planned - balance.done;
  const data = filtered.length === 0 ? incomes : filtered;
  return (
    <PizzaChart key="incomes" data={data}>
      {t('remaining', { value: remain })} <TrendingUp className="h-4 w-4 mx-2" />
    </PizzaChart>
  );
}

export function ExpensesPieChart() {
  const { t } = useTranslation();
  const [expenses] = useRegisters('expenses');
  const filtered = useMemo(() => expenses.filter((item) => item.checked), [expenses]);
  const balance = useExpensesBalance();
  const remain = balance.planned - balance.done;
  const data = filtered.length === 0 ? expenses : filtered;
  return (
    <PizzaChart key="expenses" data={data}>
      {t('remaining', { value: remain })} <TrendingUp className="h-4 w-4 mx-2" />
    </PizzaChart>
  );
}

export function InvestmentsPieChart() {
  const { t } = useTranslation();
  const [investments] = useRegisters('investments');
  const filtered = useMemo(() => investments.filter((item) => item.checked), [investments]);
  const balance = useInvestmentsBalance();
  const remain = balance.planned - balance.done;
  const data = filtered.length === 0 ? investments : filtered;
  return (
    <PizzaChart key="investments" data={data}>
      {t('remaining', { value: remain })} <TrendingUp className="h-4 w-4 mx-2" />
    </PizzaChart>
  );
}
