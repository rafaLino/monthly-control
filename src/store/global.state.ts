import { ExtractionLog } from '@/types/extraction-log.types';
import { Goal } from '@/types/goal';
import { Register } from '@/types/register.types';

export type SetRegistersActionType =
  | { type: 'add'; payload: { name: string } }
  | { type: 'update'; payload: { id: string; value: Partial<Register> } }
  | { type: 'remove'; payload: { id: string } }
  | { type: 'checkAll'; payload: { value: boolean | 'indeterminate' } };

export interface GlobalState {
  incomes: Array<Register>;
  expenses: Array<Register>;
  investments: Array<Register>;
  goal: Goal;
  loading: boolean;
  syncing: boolean;
  extractionLogs: Array<ExtractionLog>;
  actions: {
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
    loadExtractionLogs: (extractionLogs: Array<ExtractionLog>) => void;
    addExtractionLogs: (log: ExtractionLog) => void;
    setExtractionLogNote: (logId: string, notes: string) => void;
    removeExtractionLog: (logId: string) => void;
  };
}
