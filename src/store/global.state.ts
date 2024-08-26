import { Goal } from '@/types/goal';
import { Register } from '@/types/register.types';

export interface GlobalState {
    incomes: Array<Register>;
    expenses: Array<Register>;
    investments: Array<Register>;
    goal: Goal;
    loading: boolean;
    actions: {
        setIncomes: (incomes: Array<Register>) => void;
        setExpenses: (expenses: Array<Register>) => void;
        setInvestments: (investments: Array<Register>) => void;
        setGoal: (goal: Goal) => void;
        setLoading: (loading: boolean) => void;
        setRegisters: (incomes: Array<Register>, expenses: Array<Register>, investments: Array<Register>) => void
        getRegisters: () => {
            incomes: Array<Register>,
            expenses: Array<Register>,
            investments: Array<Register>
        }
    }
}