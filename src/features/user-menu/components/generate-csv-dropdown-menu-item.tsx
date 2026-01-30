import { DropdownMenuItem } from '@/components/ui/dropdown-menu';
import { objectToCSV } from '@/lib/csv-parser';
import { getReferenceDate } from '@/lib/get-reference-date';
import { saveFile } from '@/lib/save-file';
import { generateId } from '@/lib/utils';
import { getAll, useContainsRegisters } from '@/store';
import { Register } from '@/types/register.types';
import { format } from 'date-fns';
import { FC, PropsWithChildren, useTransition } from 'react';

export const GenerateCsvDropdownMenuItem: FC<PropsWithChildren<{ hidden: boolean }>> = ({ children, hidden }) => {
  const exists = useContainsRegisters();
  const [isPending, startTransition] = useTransition();

  const disabled = isPending || !exists;

  const handleGenerateCsv = async () => {
    startTransition(async () => {
      const items = getAll();
      const data = transformDataToCsvFormat(items);
      const csvContent = await objectToCSV([data]);

      if (!csvContent) return;

      await saveFile(csvContent, `${data.date}.csv`);
    });
  };

  return hidden ? null : (
    <DropdownMenuItem disabled={disabled} onClick={handleGenerateCsv}>
      {children}
    </DropdownMenuItem>
  );
};

const transformDataToCsvFormat = (items: { incomes: Register[]; expenses: Register[]; investments: Register[] }) => {
  const date = getReferenceDate();
  const data = {
    id: generateId(),
    records: items,
    date: format(date.now, 'yyyy-MM')
  };

  return data;
};
