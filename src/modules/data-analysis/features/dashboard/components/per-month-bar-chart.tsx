import { BaseBarChart, BaseBarChartProps } from '@/modules/data-analysis/components/base-bar-chart/base-bar-chart';
import { isThisYear } from 'date-fns';
import { useCallback } from 'react';
import { useTranslation } from 'react-i18next';
import { NameType, Payload, ValueType } from 'recharts/types/component/DefaultTooltipContent';
import { PerMonthChartToolTipContent } from './per-month-tooltip-content';

type Props<T> = Omit<BaseBarChartProps<T>, 'tickFormatter' | 'chartTooltipContentFormatter'>;

export const PerMonthBarChart = <T,>({ config, data, dataKey, ...props }: Props<T>) => {
  const { t } = useTranslation();

  const tickFormatter = useCallback(
    (value: Date) => {
      const format = isThisYear(value) ? 'MMM' : 'MMM/yy';
      return t('date', { date: value, context: { format } });
    },
    [t]
  );

  const chartTooltipContentFormatter = useCallback(
    (value: ValueType, name: NameType, item: Payload<ValueType, NameType>, index: number) => {
      return <PerMonthChartToolTipContent config={config} value={value} name={name} item={item} index={index} />;
    },
    [config, t]
  );

  return (
    <BaseBarChart
      title={t('dashboard.perMonthTitle')}
      config={config}
      data={data}
      dataKey={dataKey}
      tickFormatter={tickFormatter}
      chartTooltipContentFormatter={chartTooltipContentFormatter}
      {...props}
    />
  );
};
