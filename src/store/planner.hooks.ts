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
import { Register, RegisterType } from '@/types/register.types';
import { TemporalState } from 'zundo';
import { useStore } from 'zustand';
import { useShallow } from 'zustand/react/shallow';
import { SetRegistersActionType, TemporalPartializedState } from './global.state';
import { useGlobalStore } from './store';

//services
export const load = async () => {
  const { setRegisters } = useGlobalStore.getState().plannerActions;

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
export const useRegisters = (type: RegisterType): [Register[], (action: SetRegistersActionType) => void] => {
  return useGlobalStore(
    useShallow(
      (state) =>
        [state[type], state.plannerActions[`set${capitalize(type)}` as 'setIncomes' | 'setExpenses' | 'setInvestments']] as const
    )
  );
};

export const useReadRegisters = <T = Register>(type: RegisterType, selector?: (item: Register[]) => T[]): Array<T> => {
  return useGlobalStore(useShallow((state) => (selector ? selector(state[type]) : state[type]) as Array<T>));
};

export const useContainsRegisters = () => {
  return useGlobalStore((state) => !!state.incomes.length || !!state.expenses.length || !!state.investments.length);
};

export const useRegisterSum = <T = number>(type: RegisterType, selector?: (val: number) => T) => {
  return useGlobalStore((state) => {
    const value = getPlannedBalance(state[type]);
    return selector ? selector(value) : value;
  });
};

export const useActions = () => {
  return useGlobalStore(useShallow((state) => state.plannerActions));
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
  return useGlobalStore(
    useShallow((state) => {
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
    })
  );
};

export const useGoals = () => {
  return useGlobalStore(
    useShallow((state) => {
      return [state.goal, state.plannerActions.setGoal] as const;
    })
  );
};

export const useSync = () => {
  return useGlobalStore(useShallow((state) => [state.syncing, state.plannerActions.setSyncing] as const));
};

export const useTemporalStore = <T>(selector: (state: TemporalState<TemporalPartializedState>) => T) =>
  useStore(useGlobalStore.temporal, selector);
