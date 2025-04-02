import { Badge } from '@/components/ui/badge';
import { Register } from '@/types/register.types';
import { CellContext } from '@tanstack/react-table';
import { useTranslation } from 'react-i18next';

export function PercentCell({ getValue, table }: Readonly<CellContext<Register, unknown>>) {
  const { t } = useTranslation();
  const total = table.options.meta?.total ?? 0;
  const value = getValue<number>();
  const percentage = value / total;
  return (
    <div>
      <Badge>{t('percentage', { value: percentage })}</Badge>
    </div>
  );
}
