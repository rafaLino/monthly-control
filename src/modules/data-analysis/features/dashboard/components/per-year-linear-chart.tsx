import { BaseLinearChart, BaseLinearChartProps } from '@/modules/data-analysis/components/base-linear-chart/base-linear.chart';
import { useTranslation } from 'react-i18next';

type Props<T> = Omit<BaseLinearChartProps<T>, 'tickFormatter' | 'chartTooltipContentFormatter' | 'title'>;

export const PerYearLinearChart = <T,>({ config, data, dataKey }: Props<T>) => {
  const { t } = useTranslation();

  return <BaseLinearChart title={t('dashboard.yearEvolution')} config={config} data={data} dataKey={dataKey} />;
};
