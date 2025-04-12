import { LabelContent } from '@/components/pizza-chart/label-content';
import { ChartConfig, ChartContainer, ChartTooltip, ChartTooltipContent } from '@/components/ui/chart';
import { ChartCard } from '@/modules/data-analysis/components/chart-card/chart.card';
import { FC, useMemo } from 'react';
import { Label, Pie, PieChart } from 'recharts';

type Props = {
  data: Array<{ name: string; value: number; fill: string }>;
  config: ChartConfig;
};
export const WhereIsMyMoneyPieChart: FC<Props> = ({ data, config }) => {
  const total = useMemo(() => data.reduce((acc, curr) => acc + curr.value, 0), [data]);
  return (
    <ChartCard>
      <ChartContainer config={config} className="mx-auto aspect-square max-h-[250px] z-0">
        <PieChart>
          <ChartTooltip cursor={false} content={<ChartTooltipContent nameKey="name" />} />
          <Pie data={data} dataKey="value" nameKey="name" innerRadius={60} strokeWidth={5}>
            <Label content={<LabelContent total={total} />} />
          </Pie>
        </PieChart>
      </ChartContainer>
    </ChartCard>
  );
};
