import { BaseBarChart, BaseBarChartProps } from "@/modules/data-analysis/components/base-bar-chart/base-bar-chart";
import { useCallback } from "react";
import { NameType, Payload, ValueType } from "recharts/types/component/DefaultTooltipContent";
import { PerMonthChartToolTipContent } from "./per-month-tooltip-content";
import { useTranslation } from "react-i18next";

type Props<T> = Omit<BaseBarChartProps<T>, 'tickFormatter' | 'chartTooltipContentFormatter'>


export const PerYearBarChart = <T,>({ config, data, dataKey }: Props<T>) => {
    const { t } = useTranslation();
    const chartTooltipContentFormatter = useCallback((value: ValueType, name: NameType, item: Payload<ValueType, NameType>, index: number) => {
        return <PerMonthChartToolTipContent config={config} value={value} name={name} item={item} index={index} />
    }, [config])

    return (
        <BaseBarChart
            title={t('dashboard.perYearTitle')}
            config={config}
            data={data}
            dataKey={dataKey}
            chartTooltipContentFormatter={chartTooltipContentFormatter}
        />
    )
}
