import { Register } from '@/types/register.types';
import { CellContext } from '@tanstack/react-table';
import { CircleX } from 'lucide-react';

export function DeleteCell({ row: { index }, table }: Readonly<CellContext<Register, unknown>>) {
  return (
    <button className="sm:invisible group-hover:visible" onClick={() => table.options.meta?.removeData(index)}>
      <CircleX size={20} />
    </button>
  );
}
