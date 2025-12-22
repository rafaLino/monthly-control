import { Badge } from '@/components/ui/badge';
import { cn } from '@/lib/utils';
import { Register } from '@/types/register.types';
import { CellContext } from '@tanstack/react-table';
import { MouseEvent } from 'react';
import { useTranslation } from 'react-i18next';

export function PercentCell({ getValue, row, table }: Readonly<CellContext<Register, unknown>>) {
  'use no memo';
  const { t } = useTranslation();
  const total = table.options.state.total ?? 0;
  const value = getValue<number>();
  const percentage = value / total;

  const handleClick = (event: MouseEvent<HTMLButtonElement>) => {
    if (!event.ctrlKey) return;

    event.preventDefault();
    row.toggleSelected();
  };
  return (
    <div key={row.id}>
      <Badge className={cn(row.getIsSelected() && 'opacity-50')} asChild>
        <button onClick={handleClick}>{t('percentage', { value: percentage })}</button>
      </Badge>
    </div>
  );
}
