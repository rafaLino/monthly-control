import { ChartConfig } from '@/components/ui/chart';
import { FC, memo } from 'react';
import { useTranslation } from 'react-i18next';
import { NameType, Payload, ValueType } from 'recharts/types/component/DefaultTooltipContent';

type ChartToolTipContentProps = {
  config: ChartConfig;
  name: NameType;
  item: Payload<ValueType, NameType>;
  value: ValueType;
  index: number;
};
export const ReviewChartToolTipContent: FC<ChartToolTipContentProps> = memo(({ value, name, item }) => {
  const { t } = useTranslation();
  const date = item.payload.date;
  return (
    <>
      <span className="font-semibold">{t('date', { date, format: 'MMMM yyy' })}</span>
      <div className="flex items-center w-full gap-1">
        <div
          className="h-2.5 w-2.5 shrink-0 rounded-[2px] bg-(--color-bg)"
          style={
            {
              '--color-bg': `var(--color-${name})`
            } as React.CSSProperties
          }
        />
        <span>{name}</span>
        <div className={'ml-auto flex items-center gap-0.5 font-mono font-medium tabular-nums text-foreground'}>
          {t('currency', { value })}
        </div>
      </div>
    </>
  );
});
