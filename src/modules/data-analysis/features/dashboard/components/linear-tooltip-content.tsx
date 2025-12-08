import { FC, memo } from 'react';
import { useTranslation } from 'react-i18next';
import { NameType, ValueType } from 'recharts/types/component/DefaultTooltipContent';

type Props = {
  name: NameType;
  value: ValueType;
};
export const LinearToolTipContent: FC<Props> = memo(({ value, name }) => {
  const { t } = useTranslation();
  return (
    <>
      <div className="flex items-center w-full gap-1">
        <div
          className="h-2.5 w-2.5 shrink-0 rounded-[2px] bg-(--color-bg)"
          style={
            {
              '--color-bg': `var(--color-${name})`
            } as React.CSSProperties
          }
        />
        <div className={'flex items-center gap-0.5 font-mono font-medium tabular-nums text-foreground'}>
          {t('currency', { value })}
        </div>
      </div>
    </>
  );
});
