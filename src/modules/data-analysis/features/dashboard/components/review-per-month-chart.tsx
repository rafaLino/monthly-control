import { ChartConfig, ChartContainer, ChartTooltip, ChartTooltipContent } from '@/components/ui/chart';
import { Select, SelectContent, SelectGroup, SelectItem, SelectLabel, SelectTrigger, SelectValue } from '@/components/ui/select';
import { ChartCard } from '@/modules/data-analysis/components/chart-card/chart.card';
import { useCallback, useMemo, useState } from 'react';
import { useTranslation } from 'react-i18next';
import { Bar, BarChart, CartesianGrid, LabelList, XAxis } from 'recharts';
import { NameType, Payload, ValueType } from 'recharts/types/component/DefaultTooltipContent';
import { ReviewChartToolTipContent } from './review-per-month-tooltip-content';

type Props<T> = {
  data: Array<T>;
  config: ChartConfig;
  dataKey: string;
};
export const ReviewPerMonthChart = <T,>({ data, config, dataKey }: Props<T>) => {
  const { t } = useTranslation('translation');
  const bars = useMemo(() => Object.keys(config), [config]);
  const [activeChart, setActiveChart] = useState<keyof typeof config>('');

  const tickFormatter = useCallback(
    (value: Date) => {
      return t('date', { date: value, context: { format: 'MMM' } });
    },
    [t]
  );

  const dataChart = useMemo(() => data.filter((x) => (x as any).name === activeChart), [activeChart]);

  const chartTooltipContentFormatter = useCallback(
    (value: ValueType, name: NameType, item: Payload<ValueType, NameType>, index: number) => {
      return <ReviewChartToolTipContent config={config} value={value} name={name} item={item} index={index} />;
    },
    [config, t]
  );

  return (
    <ChartCard
      title={t('dashboard.summary')}
      header={
        <div className="m-1 justify-self-end">
          <Select value={activeChart} onValueChange={setActiveChart}>
            <SelectTrigger className="w-[180px]">
              <SelectValue />
            </SelectTrigger>
            <SelectContent>
              <SelectGroup>
                <SelectLabel>{t('dashboard.select')}</SelectLabel>
                {bars.map((item) => (
                  <SelectItem key={item} value={item}>
                    {item}
                  </SelectItem>
                ))}
              </SelectGroup>
            </SelectContent>
          </Select>
        </div>
      }
    >
      <ChartContainer config={config} className="aspect-auto h-[250px] w-full">
        <BarChart
          accessibilityLayer
          data={dataChart}
          margin={{
            top: 22,
            right: 12,
            left: 12
          }}
        >
          <CartesianGrid vertical={false} />
          <XAxis dataKey={dataKey} tickLine={false} axisLine={false} tickMargin={0} tickFormatter={tickFormatter} />
          <ChartTooltip
            cursor={false}
            content={<ChartTooltipContent nameKey="date" hideLabel formatter={chartTooltipContentFormatter} />}
          />

          <Bar dataKey={activeChart} stackId={'moth'} fill={`var(--color-${activeChart})`}>
            <LabelList
              position="top"
              offset={12}
              className="fill-foreground"
              fontSize={12}
              formatter={(value: string) => t('currency', { value })}
            />
          </Bar>
        </BarChart>
      </ChartContainer>
    </ChartCard>
  );
};
