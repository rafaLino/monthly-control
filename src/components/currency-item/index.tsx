import { cn } from '@/lib/utils';
import { ComponentPropsWithoutRef, FC, ReactNode } from 'react';
import { Translation } from 'react-i18next';

type twTextColor = `text-${string}-${string}`;
type OPERATORS = '>' | '<' | '>=' | '<=' | '==';

export type ConditionalColor = {
  condition: OPERATORS;
  value: number;
  true: twTextColor;
  false: twTextColor;
};

const DEFAULT_COLOR = {
  condition: '>=',
  value: 0,
  true: 'text-green-400',
  false: 'text-red-400'
} satisfies ConditionalColor;

type CurrencyItemProps = Omit<ComponentPropsWithoutRef<'span'>, 'color' | 'children'> & {
  value: number;
  color?: Partial<ConditionalColor>;
  children?: ReactNode | ((v: string) => ReactNode);
};

export const CurrencyItem: FC<CurrencyItemProps> = ({ value, color: conditionalColor, ...props }) => {
  const color = getColor(value, { ...DEFAULT_COLOR, ...conditionalColor });
  return <Translation>{(t) => <Content color={color} valueAsString={t('currency', { value })} {...props} />}</Translation>;
};

const Content: FC<Omit<CurrencyItemProps, 'value' | 'color'> & { valueAsString: string; color: string }> = ({
  valueAsString,
  color,
  className,
  children,
  ...props
}) => {
  if (children) renderChildren(valueAsString);

  return (
    <span className={cn('text-base hover:opacity-95', className, color)} {...props}>
      {valueAsString}
    </span>
  );
};

const renderChildren = (valueAsString: string, children?: ReactNode | ((value: string) => ReactNode)) =>
  typeof children === 'function' ? children(valueAsString) : children;

const getColor = (value: number, color: ConditionalColor) => {
  const operators: Record<OPERATORS, boolean> = {
    '>': value > color.value,
    '>=': value >= color.value,
    '==': value === color.value,
    '<': value < color.value,
    '<=': value <= color.value
  };

  return operators[color.condition] ? color.true : color.false;
};
