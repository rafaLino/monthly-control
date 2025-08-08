import { Card, CardTitle } from '@/components/ui/card';
import { cn } from '@/lib/utils';
import { FC } from 'react';
import { Translation } from 'react-i18next';

type ProjectionResultCardProps = {
  value: number;
  variant?: 'info' | 'success' | 'warning';
  error?: boolean;
};

function getColorClass(variant: string) {
  switch (variant) {
    case 'warning':
      return { bgColor: 'bg-red-200', textColor: 'text-red-500' };
    case 'success':
      return { bgColor: 'bg-green-200', textColor: 'text-green-500' };
    default:
      return { bgColor: 'bg-blue-200', textColor: 'text-blue-500' };
  }
}
export const ProjectionResultCard: FC<ProjectionResultCardProps> = ({ value, error = false, variant = 'info' }) => {
  const { bgColor, textColor } = getColorClass(variant);
  return (
    <Card className={cn('text-center text-md p-2 sm:min-w-32', bgColor)}>
      <Translation>
        {(t) => (
          <CardTitle className={cn('text-xl sm:text-2xl', textColor, error && 'text-red-500')}>
            {t('currency', { value })}
          </CardTitle>
        )}
      </Translation>
    </Card>
  );
};
