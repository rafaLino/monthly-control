import { BaseLinearChart, BaseLinearChartProps } from '@/modules/data-analysis/components/base-linear-chart/base-linear.chart';
import { isThisYear } from 'date-fns';
import { useCallback } from 'react';
import { useTranslation } from 'react-i18next';

type Props<T> = Omit<BaseLinearChartProps<T>, 'tickFormatter' | 'chartTooltipContentFormatter' | 'title'>;

export const PerMonthLinearChart = <T,>({ config, data, dataKey }: Readonly<Props<T>>) => {
  const { t } = useTranslation();

  const tickFormatter = useCallback(
    (value: Date) => {
      const format = isThisYear(value) ? 'MMM' : 'MMM/yy';
      return t('date', { date: value, context: { format } });
    },
    [t]
  );

  return (
    <BaseLinearChart
      title={t('dashboard.monthEvolution')}
      config={config}
      data={data}
      dataKey={dataKey}
      tickFormatter={tickFormatter}
    />
  );
};
