import { CSVtoObject } from '@/lib/csv-to-object';
import { Transaction } from '../types/transaction';

export function normalizeTransactions(csv: string) {
  const data = CSVtoObject<Transaction>(csv);
  return data.filter((item) => item.date && item.title && item.amount).map((item, index) => ({ ...item, id: String(index + 1) }));
}
