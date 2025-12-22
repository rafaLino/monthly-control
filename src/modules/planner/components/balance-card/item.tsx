import { CardTitle } from '@/components/ui/card';
import { COLORS } from '@/lib/colors';
import { cn } from '@/lib/utils';
import { Translation } from 'react-i18next';

type ItemProps = {
  testid: string;
  value: number;
  color: 'green' | 'red';
};

export const Item = ({ value, color, testid }: ItemProps) => {
  const { text } = COLORS[color];
  return (
    <Translation>
      {(t) => (
        <CardTitle className={cn('text-base hover:opacity-95', text)} data-testid={testid}>
          {t('currency', { value })}
        </CardTitle>
      )}
    </Translation>
  );
};
