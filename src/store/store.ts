
import { getBalance, getExpenseGoalDone, getIncomeGoalDone, getIncomeGoal, getInvestmentGoalDone, getTotalBalance, getGoalResult, getPlannedBalance, getExpenseGoal, getInvestmentGoal } from '@/lib/business-logic';
import { create } from 'zustand';
import { GlobalState } from './global.state';
import { Goal } from '@/types/goal';
import { capitalize } from '@/lib/utils';
import { RegisterType } from '@/types/register.types';
import { useShallow } from 'zustand/react/shallow'

//accessible only by hooks
const useGlobalStore = create<GlobalState>()((set) => ({
    incomes: [],
    expenses: [],
    investments: [],
    goal: {
        incomes: 0.05,
        expenses: 0.65,
        investments: 0.3,
    },
    actions: {
        setIncomes: (incomes) => set({ incomes }),
        setExpenses: (expenses) => set({ expenses }),
        setInvestments: (investments) => set({ investments }),
        setGoal: (goal: Goal) => set({ goal }),
    }
}));


//hooks
export const useRegisters = (type: RegisterType) => {
    useGlobalStore.getState()
    return useGlobalStore(useShallow((state) => [
        state[type],
        state.actions[`set${capitalize(type)}` as keyof GlobalState['actions']]
    ] as const));
}

export const useRegisterSum = <T>(type: RegisterType, selector?: (val: number) => T) => {
    return useGlobalStore((state) => {
        const value = getPlannedBalance(state[type])
        return selector ? selector(value) : value;
    });
}

export const useActions = () => {
    return useGlobalStore((state) => state.actions);
}

export const useIncomesBalance = () => {
    return useGlobalStore(useShallow((state) => getBalance(state.incomes)));
}

export const useExpensesBalance = () => {
    return useGlobalStore(useShallow((state) => getBalance(state.expenses)));
}

export const useInvestmentsBalance = () => {
    return useGlobalStore(useShallow((state) => getBalance(state.investments)));
}

export const useTotalBalance = () => {
    return useGlobalStore(useShallow((state) => getTotalBalance(state.incomes, state.expenses, state.investments)));
}

export const useIncomeGoal = () => {
    return useGlobalStore((state) => getIncomeGoal(state.incomes, state.expenses, state.investments));
}

export const useExpenseGoal = () => {
    return useGlobalStore((state) => getIncomeGoal(state.incomes, state.expenses, state.investments));
}

export const useInvestmentGoal = () => {
    return useGlobalStore((state) => getIncomeGoal(state.incomes, state.expenses, state.investments));
}

export const useIncomeGoalDone = () => {
    return useGlobalStore((state) => getIncomeGoalDone(state.incomes, state.expenses, state.investments));
}

export const useExpenseGoalDone = () => {
    return useGlobalStore((state) => getExpenseGoalDone(state.incomes, state.expenses));
}

export const useInvestmentGoalDone = () => {
    return useGlobalStore((state) => getInvestmentGoalDone(state.incomes, state.investments));
}

export const useGoalResult = () => {
    return useGlobalStore((state) => {
        const income = getIncomeGoal(state.incomes, state.expenses, state.investments);
        const expense = getExpenseGoal(state.incomes, state.expenses);
        const investment = getInvestmentGoal(state.incomes, state.investments);

        const incomeDone = getIncomeGoalDone(state.incomes, state.expenses, state.investments);
        const expenseDone = getExpenseGoalDone(state.incomes, state.expenses);
        const investmentDone = getInvestmentGoalDone(state.incomes, state.investments);
        console.log(income, expense, investment, incomeDone, expenseDone, investmentDone)
        const result = getGoalResult(state.goal, incomeDone, expenseDone, investmentDone);

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
}


