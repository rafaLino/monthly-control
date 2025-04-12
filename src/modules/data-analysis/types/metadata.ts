import { ChartConfig } from '@/components/ui/chart';

export type MetadataType =
  | 'groupPerMonth'
  | 'groupPerYear'
  | 'incomesMonthEvolution'
  | 'expensesMonthEvolution'
  | 'investmentsMonthEvolution'
  | 'incomesYearEvolution'
  | 'expensesYearEvolution'
  | 'investmentsYearEvolution'
  | 'whereIsMyIncomes'
  | 'whereIsMyExpenses'
  | 'whereIsMyInvestments';

export interface Metadata<T = any> {
  data: Array<T>;
  config: ChartConfig;
  dataKey: string;
  type: MetadataType;
}
