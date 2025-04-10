import { Goal } from '@/types/goal';
import { LocalParams } from '@/types/local-params';
import { Register } from '@/types/register.types';

export type SetRegistersActionType =
  | { type: 'add'; payload: { name: string } }
  | { type: 'update'; payload: { id: string; value: Partial<Register> } }
  | { type: 'remove'; payload: { id: string } }
  | { type: 'checkAll'; payload: { value: boolean | 'indeterminate' } };


export interface PlannerSlice {
  incomes: Array<Register>;
  expenses: Array<Register>;
  investments: Array<Register>;
  goal: Goal;
  loading: boolean;
  syncing: boolean;
  plannerActions: {
    setIncomes: (action: SetRegistersActionType) => void;
    setExpenses: (action: SetRegistersActionType) => void;
    setInvestments: (action: SetRegistersActionType) => void;
    setGoal: (goal: Goal) => void;
    setLoading: (loading: boolean) => void;
    setSyncing: (syncing: boolean) => void;
    setRegisters: (incomes: Array<Register>, expenses: Array<Register>, investments: Array<Register>) => void;
    getRegisters: () => {
      incomes: Array<Register>;
      expenses: Array<Register>;
      investments: Array<Register>;
    };
  };
}

export interface DataAnalysisSlice {
  params: LocalParams;
  dataAnalysisActions: {
    setParams: (params: Partial<LocalParams>) => void;
  }
}

export type GlobalState = PlannerSlice & DataAnalysisSlice;