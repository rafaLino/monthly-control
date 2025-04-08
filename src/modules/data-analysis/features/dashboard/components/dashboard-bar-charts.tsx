import { BaseBarChartProps } from "@/modules/data-analysis/components/base-bar-chart/base-bar-chart"
import { MetadataType } from "@/modules/data-analysis/types/metadata"
import { PerMonthBarChart } from "./per-month-bar-chart"
import { PerYearBarChart } from "./per-year-bar-chart"


type Props<T> = {
    type: MetadataType,
} & BaseBarChartProps<T>

export const DashboardBarCharts = <T,>({ type, ...props }: Readonly<Props<T>>) => {
    switch (type) {
        case 'groupPerMonth':
            return <PerMonthBarChart {...props} />

        case 'groupPerYear':
            return <PerYearBarChart {...props} />

        default:
            <></>
    }

}