import { BaseBarChartProps } from '@/modules/data-analysis/components/base-bar-chart/base-bar-chart';
import { MetadataType } from '@/modules/data-analysis/types/metadata';
import { PerMonthBarChart } from './per-month-bar-chart';
import { PerMonthLinearChart } from './per-month-linear-chart';
import { PerYearBarChart } from './per-year-bar-chart';
import { PerYearLinearChart } from './per-year-linear-chart';
import { WhereIsMyMoneyPieChart } from './where-is-my-money-pie-chart';

type Props<T> = {
  type: MetadataType;
} & BaseBarChartProps<T>;

export const DashboardBarCharts = <T,>({ type, ...props }: Readonly<Props<T>>) => {
  switch (type) {
    case 'groupPerMonth':
      return <PerMonthBarChart {...props} />;

    case 'groupPerYear':
      return <PerYearBarChart {...props} />;

    case 'incomesMonthEvolution':
    case 'expensesMonthEvolution':
    case 'investmentsMonthEvolution':
      return <PerMonthLinearChart {...props} />;

    case 'incomesYearEvolution':
    case 'expensesYearEvolution':
    case 'investmentsYearEvolution':
      return <PerYearLinearChart {...props} />;

    case 'whereIsMyIncomes':
    case 'whereIsMyExpenses':
    case 'whereIsMyInvestments':
      return (
        <WhereIsMyMoneyPieChart data={props.data as Array<{ name: string; value: number; fill: string }>} config={props.config} />
      );

    default:
      return <>No data</>;
  }
};
