import { CSVtoObject } from '@/lib/csv-to-object';
import { RefDateSchema } from '@/types/refDate';
import { getMonth, getYear } from 'date-fns';
import { Transaction } from '../types/transaction';

export function normalizeTransactions(csv: string) {
  const data = CSVtoObject<Transaction>(csv);
  return data.filter((item) => item.date && item.title && item.amount).map((item, index) => ({ ...item, id: String(index + 1) }));
}

export function getRefDateFromTransactions(items: Transaction[]) {
  const unique = Array.from(new Set(items.map((item) => getYear(item.date))));
  const year = unique.at(0);
  const month = getMonth(new Date()) + 1;
  return RefDateSchema.parse(`${year}-${month}`);
}

export function setMap<K, V>(map: Map<K, V>, key: K, value: V | undefined) {
  if (!value) return map;
  return new Map(map).set(key, value);
}
