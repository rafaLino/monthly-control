import { ChartContainer } from "@/components/ui/chart"
import { FC, useMemo } from "react"
import { Bar, BarChart, CartesianGrid, XAxis } from "recharts"

type Props = {
    config: Record<string, { label: string, color: string }>,
    data: any[],
    dataKey: string
}
export const BaseBarChart: FC<Props> = ({ config, data, dataKey }) => {
    const bars = useMemo(() => Object.entries(config), [])
    return (
        <ChartContainer config={config} className="h-[200px] w-full">
            <BarChart accessibilityLayer data={data}>
                <CartesianGrid vertical={false} />
                <XAxis
                    dataKey={dataKey}
                    tickLine={false}
                    tickMargin={10}
                    axisLine={false}
                    tickFormatter={(value) => value.slice(0, 3)}
                />
                {bars.map(([key, value]) => (
                    <Bar key={key} dataKey={key} fill={value.color} radius={4} />
                ))}
            </BarChart>
        </ChartContainer>
    )
}