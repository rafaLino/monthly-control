import { ChartConfig, ChartContainer, ChartTooltip, ChartTooltipContent } from '@/components/ui/chart';
import { useMemo } from 'react';
import { useTranslation } from 'react-i18next';
import { Area, AreaChart, CartesianGrid, LabelList, Line, LineChart, XAxis } from 'recharts';
import { LinearToolTipContent } from '../../features/dashboard/components/linear-tooltip-content';
import { ChartCard } from '../chart-card/chart.card';

export type BaseLinearChartProps<T> = {
  config: ChartConfig;
  data: T[];
  dataKey: string;
  title?: string;
  tickFormatter?: (value: any, index: number) => string;
};

export const BaseLinearChart = <T,>({
  config,
  data,
  dataKey,
  title,
  tickFormatter,
}: Readonly<BaseLinearChartProps<T>>) => {
  const bars = useMemo(() => Object.keys(config), [config]);
  const { t } = useTranslation();
  return (
    <ChartCard title={title}>
      <ChartContainer config={config} className='h-[300px] w-full'>
        <AreaChart
          accessibilityLayer
          data={data}
          margin={{
            left: 12,
            right: 12,
          }}
        >
          <CartesianGrid vertical={false} />
          <XAxis dataKey={dataKey} tickLine={false} axisLine={false} tickMargin={8} tickFormatter={tickFormatter} />
          <ChartTooltip
            cursor={false}
            content={
              <ChartTooltipContent
                hideLabel
                formatter={(value, name) => <LinearToolTipContent name={name} value={value} />}
              />
            }
          />
          {bars.map((key) => (
            <Area
              key={key}
              dataKey={key}
              type='linear'
              fill={`var(--color-${key})`}
              stroke={`var(--color-${key})`}
              strokeWidth={2}
              dot={false}
            >
              <LabelList
                formatter={(label) => t('currency', { value: label?.toString() })}
                position='top'
                offset={12}
                className='fill-foreground'
                fontSize={12}
              />
            </Area>
          ))}
        </AreaChart>
      </ChartContainer>
    </ChartCard>
  );
};
