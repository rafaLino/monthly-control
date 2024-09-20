import {
  getBalance,
  getExpenseGoal,
  getExpenseGoalDone,
  getGoalResult,
  getIncomeGoal,
  getIncomeGoalDone,
  getInvestmentGoal,
  getInvestmentGoalDone,
  getPlannedBalance,
  getTotalBalance
} from '@/lib/business-logic';
import { fetchRegisters } from '@/lib/fetch-registers';
import { capitalize } from '@/lib/utils';
import { Goal } from '@/types/goal';
import { Register, RegisterType } from '@/types/register.types';
import { create } from 'zustand';
import { useShallow } from 'zustand/react/shallow';
import { GlobalState } from './global.state';

const THREE_SECONDS = 3_000;
//accessible only by hooks
const useGlobalStore = create<GlobalState>()((set, get) => ({
  incomes: [],
  expenses: [],
  investments: [],
  goal: {
    incomes: 0.05,
    expenses: 0.65,
    investments: 0.3
  },
  loading: false,
  syncing: false,
  actions: {
    setIncomes: (incomes) => set({ incomes }),
    setExpenses: (expenses) => set({ expenses }),
    setInvestments: (investments) => set({ investments }),
    setGoal: (goal: Goal) => set({ goal }),
    setLoading: (loading: boolean) => set({ loading }),
    setRegisters: (incomes: Array<Register>, expenses: Array<Register>, investments: Array<Register>) => {
      set({ syncing: true, incomes, expenses, investments });
      setTimeout(() => {
        set({ syncing: false });
      }, THREE_SECONDS);
    },
    setSyncing: (syncing: boolean) => {
      set({ syncing });
    },
    getRegisters: () => {
      const state = get();
      return {
        incomes: state.incomes,
        expenses: state.expenses,
        investments: state.investments
      };
    }
  }
}));

//services
export const load = async () => {
  const { setRegisters } = useGlobalStore.getState().actions;

  const collection = await fetchRegisters();
  setRegisters(collection.incomes, collection.expenses, collection.investments);
};
export const getAll = () => {
  const state = useGlobalStore.getState();
  return {
    incomes: state.incomes,
    expenses: state.expenses,
    investments: state.investments
  };
};

//hooks
export const useRegisters = (type: RegisterType) => {
  return useGlobalStore(
    useShallow(
      (state) =>
        [state[type], state.actions[`set${capitalize(type)}` as 'setIncomes' | 'setExpenses' | 'setInvestments']] as const
    )
  );
};

export const useRegisterSum = <T>(type: RegisterType, selector?: (val: number) => T) => {
  return useGlobalStore((state) => {
    const value = getPlannedBalance(state[type]);
    return selector ? selector(value) : value;
  });
};

export const useActions = () => {
  return useGlobalStore((state) => state.actions);
};

export const useIncomesBalance = () => {
  return useGlobalStore(useShallow((state) => getBalance(state.incomes)));
};

export const useExpensesBalance = () => {
  return useGlobalStore(useShallow((state) => getBalance(state.expenses)));
};

export const useInvestmentsBalance = () => {
  return useGlobalStore(useShallow((state) => getBalance(state.investments)));
};

export const useTotalBalance = () => {
  return useGlobalStore(useShallow((state) => getTotalBalance(state.incomes, state.expenses, state.investments)));
};

export const useGoalResult = () => {
  return useGlobalStore((state) => {
    const income = getIncomeGoal(state.incomes, state.expenses, state.investments);
    const expense = getExpenseGoal(state.incomes, state.expenses);
    const investment = getInvestmentGoal(state.incomes, state.investments);
    const result = getGoalResult(state.goal, income, expense, investment);

    const incomeDone = getIncomeGoalDone(state.incomes, state.expenses, state.investments);
    const expenseDone = getExpenseGoalDone(state.incomes, state.expenses);
    const investmentDone = getInvestmentGoalDone(state.incomes, state.investments);

    return {
      income,
      expense,
      investment,
      incomeDone,
      expenseDone,
      investmentDone,
      result
    };
  });
};

export const useGoals = () => {
  return useGlobalStore((state) => {
    return [state.goal, state.actions.setGoal] as const;
  });
};

export const useSync = () => {
  return useGlobalStore((state) => [state.syncing, state.actions.setSyncing] as const);
};
