import { Label, Pie, PieChart } from 'recharts';
import { Card, CardContent, CardFooter } from '@/components/ui/card';
import { ChartConfig, ChartContainer, ChartTooltip, ChartTooltipContent } from '@/components/ui/chart';
import { removeAccents, sum } from '@/lib/utils';
import { Register } from '@/types/register.types';
import { PropsWithChildren, useMemo } from 'react';
import { useColors } from './hooks/useColors';
import { LabelContent } from './label-content';

type PizzaChartProps = PropsWithChildren<{
  data: Array<Register>;
}>;

export function PizzaChart({ data, children }: Readonly<PizzaChartProps>) {
  const colors = useColors(data.length);

  const [chartData, chartConfig] = useMemo(() => {
    const chartData = data.map((register) => ({
      name: register.name,
      value: register.value,
      fill: `var(--color-${removeAccents(register.name)})`,
    }));
    const chartConfig = chartData.reduce(
      (acc, curr, index) => {
        acc[removeAccents(curr.name)] = {
          label: curr.name,
          color: colors[index],
        };
        return acc;
      },
      { total: { label: 'Total' } } as ChartConfig
    );
    return [chartData, chartConfig] as const;
  }, [data, colors]);

  const total = useMemo(() => sum(data), [data]);

  return (
    <Card className='flex flex-col mb-1.5'>
      <CardContent className='flex-1 pb-0'>
        <ChartContainer config={chartConfig} className='mx-auto aspect-square max-h-[250px] z-0'>
          <PieChart>
            <ChartTooltip cursor={false} content={<ChartTooltipContent nameKey='name' />} />
            <Pie data={chartData} dataKey='value' nameKey='name' innerRadius={60} strokeWidth={5}>
              <Label content={<LabelContent total={total} />} />
            </Pie>
          </PieChart>
        </ChartContainer>
      </CardContent>
      <CardFooter className='flex-col gap-0 text-sm p-2'>
        <div className='flex items-center gap-0 font-medium leading-none'>{children}</div>
      </CardFooter>
    </Card>
  );
}
