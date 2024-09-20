import { indexedDbService } from '@/services/indexeddb.service';
import { Register } from '@/types/register.types';

export async function fetchRegisters() {
  await indexedDbService.init();
  return await indexedDbService.getAll();
}

export async function saveRegisters({
  incomes,
  expenses,
  investments
}: { incomes: Array<Register>; expenses: Array<Register>; investments: Array<Register> }) {
  if (!incomes.length && !expenses.length && !investments.length) return;
  await indexedDbService.init();
  await indexedDbService.insert(incomes, expenses, investments);
}
