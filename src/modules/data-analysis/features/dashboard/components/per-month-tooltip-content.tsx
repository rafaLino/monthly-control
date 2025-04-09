import { ChartConfig } from "@/components/ui/chart"
import { COLORS, getColor } from "@/lib/colors"
import { cn } from "@/lib/utils"
import { RegisterType } from "@/types/register.types"
import { FC, memo, useMemo } from "react"
import { useTranslation } from "react-i18next"
import { NameType, Payload, ValueType } from "recharts/types/component/DefaultTooltipContent"

type Props = {
    config: ChartConfig,
    name: NameType,
    item: Payload<ValueType, NameType>,
    value: ValueType,
    index: number
}
export const PerMonthChartToolTipContent: FC<Props> = memo(({ config, value, name, item, index }) => {
    const { t } = useTranslation()
    const expenses = (item.payload.expenses + item.payload.investments);
    const balance = item.payload.incomes - expenses;
    const balanceColor = balance >= 0 ? 'text-green-700' : 'text-red-700'
    const textColor = useMemo(() => COLORS[getColor(name as RegisterType)].text, [name])
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
                {t((`dashboard.${config[name as keyof typeof config]?.label || name}`))}
                <div className={cn("ml-auto flex items-center gap-0.5 font-mono font-medium tabular-nums text-foreground", textColor)}>
                    {t('currency', { value })}
                </div>
            </div>
            {/* Add this after the last item */}
            {index === 2 && (
                <>
                    <div className="mt-1.5 flex basis-full items-center border-t pt-1.5 text-xs font-medium text-foreground">
                        {t('dashboard.total')}
                        <div className="ml-auto flex items-baseline gap-0.5 font-mono font-medium tabular-nums text-foreground text-red-700">
                            {t('currency', { value: expenses })}
                        </div>
                    </div>
                    <div className="flex basis-full items-center text-xs font-medium text-foreground">
                        {t('dashboard.balance')}
                        <div className={cn("ml-auto flex items-baseline gap-0.5 font-mono font-medium tabular-nums text-foreground", balanceColor)}>
                            {t('currency', { value: item.payload.incomes - expenses })}
                        </div>
                    </div>
                </>
            )}
        </>)
})