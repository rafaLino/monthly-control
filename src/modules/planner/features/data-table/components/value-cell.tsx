import { EditableNumberCell } from '@/components/editable-cell';
import { Register } from '@/types/register.types';
import { CellContext } from '@tanstack/react-table';

export function ValueCell({ getValue, row: { index }, column: { id }, table }: Readonly<CellContext<Register, unknown>>) {
  return (
    <EditableNumberCell
      id={`${id}-${index}`}
      value={getValue<number>()}
      onBlur={(newValue) => table.options.meta?.updateData(index, id, newValue)}
    />
  );
}
