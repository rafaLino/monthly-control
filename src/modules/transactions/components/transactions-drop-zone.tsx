import { CsvDropZone } from '@/components/csv-drop-zone/csv-drop-zone';
import { resolveCsv } from '@/lib/resolve-csv';
import { FC, PropsWithChildren } from 'react';
import { Transaction } from '../types/transaction';
import { normalizeTransactions } from '../utils';

export const TransactionsDropZone: FC<
  PropsWithChildren<{
    showDropZone: boolean;
    onDrop: (items: Transaction[], csv: string) => Promise<void>;
  }>
> = ({ showDropZone, children, onDrop }) => {
  const handleDrop = async (file: File | undefined) => {
    if (!file) return;
    const csv = await resolveCsv(file);
    const data = normalizeTransactions(csv);
    onDrop(data, csv);
  };

  return showDropZone ? (
    <div className="w-full col-span-3">
      <CsvDropZone onDrop={handleDrop} />
    </div>
  ) : (
    children
  );
};
