import { RefDateSchema } from '@/types/refDate';
import { getMonth, getYear } from 'date-fns';
import { Transaction } from '../types/transaction';

export function getRefDateFromTransactions(items: Transaction[]) {
  const unique = Array.from(new Set(items.map((item) => getYear(item.date))));
  const year = unique.at(0);
  const month = getMonth(new Date()) + 1;
  return RefDateSchema.parse(`${year}-${month}`);
}
