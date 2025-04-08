import { ChartConfig, ChartContainer, ChartTooltip, ChartTooltipContent } from "@/components/ui/chart"
import { useMemo } from "react"
import { Bar, BarChart, CartesianGrid, XAxis } from "recharts"
import { Formatter, NameType, ValueType } from "recharts/types/component/DefaultTooltipContent"

export type BaseBarChartProps<T> = {
    config: ChartConfig,
    data: T[],
    dataKey: string,
    tickFormatter?: (value: any, index: number) => string
    chartTooltipContentFormatter?: Formatter<ValueType, NameType>
}

export const BaseBarChart = <T,>({ config, data, dataKey, tickFormatter, chartTooltipContentFormatter }: Readonly<BaseBarChartProps<T>>) => {
    const bars = useMemo(() => Object.keys(config), [config])
    return (
        <ChartContainer config={config} className="h-[600px] w-3/4">
            <BarChart accessibilityLayer data={data}>
                <CartesianGrid vertical={false} />
                <XAxis
                    dataKey={dataKey}
                    tickLine={false}
                    tickMargin={10}
                    axisLine={true}
                    tickFormatter={tickFormatter}
                />
                <ChartTooltip
                    cursor={false}
                    content={<ChartTooltipContent indicator="line" formatter={chartTooltipContentFormatter} />}
                />

                {bars.map((key) => (
                    <Bar key={key} dataKey={key} fill={`var(--color-${key})`} radius={4} />
                ))}
            </BarChart>
        </ChartContainer>
    )
}