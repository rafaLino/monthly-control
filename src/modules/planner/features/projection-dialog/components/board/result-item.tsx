import { Badge } from '@/components/ui/badge';
import { CardTitle } from '@/components/ui/card';
import { cn } from '@/lib/utils';
import { FC } from 'react';
import { Translation } from 'react-i18next';

type ResultItemProps = {
  label: string;
  value: number;
  variant?: 'info' | 'success' | 'warning';
};

export const ResultItem: FC<ResultItemProps> = ({ label, value, variant }) => {
  const { bgColor, textColor } = getColorClass(variant);
  return (
    <div className="flex items-center justify-between">
      <span>{label}</span>
      <Badge className={cn(bgColor, 'hover:bg-transparent')}>
        <Translation>{(t) => <CardTitle className={cn('text-sm', textColor)}>{t('currency', { value })}</CardTitle>}</Translation>
      </Badge>
    </div>
  );
};

function getColorClass(variant: string | undefined) {
  switch (variant) {
    case 'warning':
      return { bgColor: 'bg-red-200', textColor: 'text-red-500' };
    case 'success':
      return { bgColor: 'bg-green-200', textColor: 'text-green-500' };
    default:
      return { bgColor: 'bg-blue-200', textColor: 'text-blue-500' };
  }
}
