import { Label, Pie, PieChart } from 'recharts';

import { Card, CardContent, CardFooter } from '@/components/ui/card';
import { ChartConfig, ChartContainer, ChartTooltip, ChartTooltipContent } from '@/components/ui/chart';
import { Register } from '@/types/register.types';
import randomColor from 'randomcolor';
import { PropsWithChildren, useMemo } from 'react';
import { sum } from '@/lib/utils';

type PizzaChartProps = PropsWithChildren<{
  data: Array<Register>;
}>;

function removeAccents(texto: string) {
  return texto
    .normalize('NFD')
    .replace(/[\u0300-\u036f]/g, '')
    .replace(/\s+/g, '_');
}

const LabelContent = ({ viewBox, total }: { viewBox?: { cx: number; cy: number }; total: number }) => {
  if (viewBox && 'cx' in viewBox && 'cy' in viewBox) {
    return (
      <text x={viewBox.cx} y={viewBox.cy} textAnchor='middle' dominantBaseline='middle'>
        <tspan x={viewBox.cx} y={viewBox.cy} className='fill-foreground text-2xl font-bold'>
          {total.toLocaleString()}
        </tspan>
        <tspan x={viewBox.cx} y={(viewBox.cy || 0) + 24} className='fill-muted-foreground'>
          Total
        </tspan>
      </text>
    );
  }
};

export function PizzaChart({ data, children }: Readonly<PizzaChartProps>) {
  const colors = useMemo(() => randomColor({ count: data.length, format: 'hsl' }), [data.length]);
  const chartData = useMemo(() => {
    return data.map((register) => ({
      name: register.name,
      value: register.value,
      fill: `var(--color-${removeAccents(register.name)})`,
    }));
  }, [data]);

  const chartConfig = useMemo(() => {
    return chartData.reduce(
      (acc, curr, index) => {
        acc[removeAccents(curr.name)] = {
          label: curr.name,
          color: colors[index],
        };
        return acc;
      },
      { total: { label: 'Total' } } as ChartConfig
    );
  }, [chartData, colors]);

  const total = useMemo(() => sum(data), [data]);

  return (
    <Card className='flex flex-col mb-1.5'>
      <CardContent className='flex-1 pb-0'>
        <ChartContainer config={chartConfig} className='mx-auto aspect-square max-h-[250px] z-0'>
          <PieChart>
            <ChartTooltip cursor={false} content={<ChartTooltipContent hideLabel />} />
            <Pie data={chartData} dataKey='value'  nameKey='name' innerRadius={60} strokeWidth={5}>
              <Label content={<LabelContent total={total} />} />
            </Pie>
          </PieChart>
        </ChartContainer>
      </CardContent>
      <CardFooter className='flex-col gap-0 text-sm p-2'>
        <div className='flex items-center gap-0 font-medium leading-none'>
          {children}
        </div>
      </CardFooter>
    </Card>
  );
}
