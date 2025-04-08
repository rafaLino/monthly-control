import { ChartConfig } from "@/components/ui/chart"
import { TFunction } from "i18next"
import { FC, memo } from "react"
import { NameType, Payload, ValueType } from "recharts/types/component/DefaultTooltipContent"

type Props = {
    config: ChartConfig,
    t: TFunction,
    name: NameType,
    item: Payload<ValueType, NameType>,
    value: ValueType,
    index: number
}
export const PerMonthChartToolTipContent: FC<Props> = memo(({ config, value, name, item, index, t }) => {
    const expenses = (item.payload.expenses + item.payload.investments)
    return (
        <>
            <div className="flex items-center w-full gap-1">
                <div
                    className="h-2.5 w-2.5 shrink-0 rounded-[2px] bg-[--color-bg]"
                    style={
                        {
                            "--color-bg": `var(--color-${name})`,
                        } as React.CSSProperties
                    }
                />
                {config[name as keyof typeof config]?.label ||
                    name}
                <div className="ml-auto flex items-center gap-0.5 font-mono font-medium tabular-nums text-foreground">
                    {t('currency', { value })}
                </div>
            </div>
            {/* Add this after the last item */}
            {index === 2 && (
                <>
                    <div className="mt-1.5 flex basis-full items-center border-t pt-1.5 text-xs font-medium text-foreground">
                        Total
                        <div className="ml-auto flex items-baseline gap-0.5 font-mono font-medium tabular-nums text-foreground">
                            {t('currency', { value: expenses })}
                        </div>
                    </div>
                    <div className="flex basis-full items-center text-xs font-medium text-foreground">
                        Balance
                        <div className="ml-auto flex items-baseline gap-0.5 font-mono font-medium tabular-nums text-foreground">
                            {t('currency', { value: item.payload.incomes - expenses })}
                        </div>
                    </div>
                </>
            )}
        </>)
})