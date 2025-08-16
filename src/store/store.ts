import { setRegisters } from '@/lib/business-logic';
import { Goal } from '@/types/goal';
import { DEFAULT_LOCAL_PARAMS } from '@/types/local-params';
import { Message, MessageInput } from '@/types/message';
import { Register } from '@/types/register.types';
import { StateCreator, create } from 'zustand';
import { persist } from 'zustand/middleware';
import { DataAnalysisSlice, GlobalState, PlannerSlice } from './global.state';
const THREE_SECONDS = 3_000;

const createPlannerSlice: StateCreator<GlobalState, [], [], PlannerSlice> = (set, get) => ({
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
  plannerActions: {
    setIncomes: (action) =>
      set((state) => {
        const incomes = setRegisters(state.incomes, action);
        return { incomes };
      }),
    setExpenses: (action) =>
      set((state) => {
        const expenses = setRegisters(state.expenses, action);
        return { expenses };
      }),
    setInvestments: (action) =>
      set((state) => {
        const investments = setRegisters(state.investments, action);
        return { investments };
      }),
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
});

const createDataAnalysisSlice: StateCreator<GlobalState, [], [], DataAnalysisSlice> = (set) => ({
  params: DEFAULT_LOCAL_PARAMS,
  messages: new Map<string, Message>(),
  chatSession: undefined,
  dataAnalysisActions: {
    setParams: (params) => set((prev) => ({ params: { ...prev.params, ...params } })),
    setChatSession: (session) => set({ chatSession: session }),
    setMessages: (id: string, message: MessageInput) =>
      set((state) => {
        const messages = new Map(state.messages);

        if (messages.has(id)) {
          let text = messages.get(id)!.text;
          text += ` ${message.text}`;
          const newMessage = { ...message, text };
          messages.set(id, newMessage);

          return { messages };
        }

        messages.set(id, message);
        return { messages };
      }),
    clearMessages: () => set({ messages: new Map<string, MessageInput>() })
  }
});

//accessible only by hooks
export const useGlobalStore = create<GlobalState>()(
  persist(
    (...args) => ({
      ...createPlannerSlice(...args),
      ...createDataAnalysisSlice(...args)
    }),
    {
      name: 'local_params',
      partialize: (state) => ({ params: state.params })
    }
  )
);
