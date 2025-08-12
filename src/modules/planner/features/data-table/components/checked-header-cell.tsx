import { Checkbox } from '@/components/ui/checkbox';
import { Register } from '@/types/register.types';
import { HeaderContext } from '@tanstack/react-table';
import { useMemo } from 'react';

export function CheckedHeaderCell({ table }: Readonly<HeaderContext<Register, unknown>>) {
  const rows = table.getRowModel().flatRows;
  const value = useMemo(() => {
    if (rows.length === 0) return false;
    const allChecked = rows.every((row) => row.original.checked);
    if (allChecked) return allChecked;
    return rows.some((row) => row.original.checked) ? 'indeterminate' : false;
  }, [rows]);

  return (
    <div className="flex justify-center w-full pl-3">
      <Checkbox tabIndex={-1} checked={value} onCheckedChange={(value) => table.options.meta?.checkAllData(value)} />
    </div>
  );
}
