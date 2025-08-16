import { Goal } from '@/types/goal';
import { LocalParams } from '@/types/local-params';
import { MessageInput } from '@/types/message';
import { Register } from '@/types/register.types';
import { ChatSession } from 'firebase/ai';

export type SetRegistersActionType =
  | { type: 'add'; payload: { name: string; value: number } }
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
  messages: Map<string, MessageInput>;
  chatSession: ChatSession | undefined;
  dataAnalysisActions: {
    setParams: (params: Partial<LocalParams>) => void;
    setChatSession: (session: ChatSession | undefined) => void;
    setMessages: (id: string, message: MessageInput) => void;
    clearMessages: () => void;
  };
}

export type GlobalState = PlannerSlice & DataAnalysisSlice;
