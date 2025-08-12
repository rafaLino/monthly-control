import { Checkbox } from '@/components/ui/checkbox';
import { Register } from '@/types/register.types';
import { CellContext } from '@tanstack/react-table';

export function CheckedCell({ getValue, row: { index }, column: { id }, table }: Readonly<CellContext<Register, unknown>>) {
  return (
    <Checkbox
      tabIndex={-1}
      checked={getValue<boolean>()}
      onCheckedChange={(checked) => table.options.meta?.updateData(index, id, checked)}
    />
  );
}
