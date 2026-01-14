import { EditableCell } from '@/components/editable-cell';
import { Register } from '@/types/register.types';
import { CellContext } from '@tanstack/react-table';


export function NameCell({ getValue, row: { index }, column: { id }, table }: Readonly<CellContext<Register, unknown>>) {
  return (
    <EditableCell
      tabIndex={-1}
      id={`${id}-${index}`}
      value={getValue<string>()}
      onBlur={(newValue) => {
        table.options.meta?.updateData(index, id, newValue);
      }}
    />
  );
}
