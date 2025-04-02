import { Register } from '@/types/register.types';
import { CellContext } from '@tanstack/react-table';
import { EditableCell } from './editable-cell';

export function NameCell({ getValue, row: { index }, column: { id }, table }: Readonly<CellContext<Register, unknown>>) {
  return (
    <EditableCell
      tabIndex={-1}
      value={getValue<string>()}
      onBlur={(newValue) => {
        table.options.meta?.updateData(index, id, newValue);
      }}
    />
  );
}
