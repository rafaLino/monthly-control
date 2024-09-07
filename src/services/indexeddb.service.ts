import { Register, RegisterType } from '@/types/register.types';
import { DBSchema, IDBPDatabase, IDBPObjectStore, openDB } from 'idb';

interface MyDb extends DBSchema {
  incomes: {
    key: string;
    value: Register;
  };
  expenses: {
    key: string;
    value: Register;
  };
  investments: {
    key: string;
    value: Register;
  };
}

export class IndexedDbService {
  private db: IDBPDatabase<MyDb> | null = null;
  private initiated = false;
  public async init() {
    if (this.initiated) {
      return;
    }
    this.db = await openDB<MyDb>('my-database', 1, {
      upgrade(db) {
        db.createObjectStore('incomes');
        db.createObjectStore('expenses');
        db.createObjectStore('investments');
      }
    });
    this.initiated = true;
  }

  public async insert(incomes: Array<Register>, expenses: Array<Register>, investments: Array<Register>) {
    if (!this.db || !this.initiated) {
      throw new Error('Database not initialized');
    }

    const tx = this.db.transaction(['incomes', 'expenses', 'investments'], 'readwrite');
    const incomesStore = tx.objectStore('incomes');
    const expensesStore = tx.objectStore('expenses');
    const investmentsStore = tx.objectStore('investments');

    await this.clear(incomesStore, expensesStore, investmentsStore);
    await Promise.all([
      ...incomes.map(async (income) => {
        await incomesStore.put(income, income.id);
      }),
      ...expenses.map(async (expense) => {
        await expensesStore.put(expense, expense.id);
      }),
      ...investments.map(async (investment) => {
        await investmentsStore.put(investment, investment.id);
      })
    ]);

    await tx.done;
  }

  public async getAll() {
    if (!this.db || !this.initiated) {
      throw new Error('Database not initialized');
    }
    const tx = this.db.transaction(['incomes', 'expenses', 'investments'], 'readonly');
    const incomesStore = tx.objectStore('incomes');
    const expensesStore = tx.objectStore('expenses');
    const investmentsStore = tx.objectStore('investments');

    const incomes = await incomesStore.getAll();
    const expenses = await expensesStore.getAll();
    const investments = await investmentsStore.getAll();

    await tx.done;

    return { incomes, expenses, investments };
  }

  private async clear(
    incomesStore: IDBPObjectStore<MyDb, RegisterType[], 'incomes', 'readwrite'>,
    expensesStore: IDBPObjectStore<MyDb, RegisterType[], 'expenses', 'readwrite'>,
    investmentsStore: IDBPObjectStore<MyDb, RegisterType[], 'investments', 'readwrite'>
  ) {
    await Promise.all([incomesStore.clear(), expensesStore.clear(), investmentsStore.clear()]);
  }
}

export const indexedDbService = new IndexedDbService();
