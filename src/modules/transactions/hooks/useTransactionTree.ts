import { TRefDate } from '@/types/refDate';
import { useReducer } from 'react';
import { Transaction } from '../types/transaction';

type State = {
  activeFile: TRefDate | null;
  transactions: Transaction[];
  csv: string | null;
};

type Action =
  | {
      type: 'SET_DATA';
      payload: { activeFile: TRefDate; transactions: Transaction[]; csv: string };
    }
  | {
      type: 'SET_TRANSACTIONS';
      payload: Transaction[];
    }
  | {
      type: 'SET_ACTIVE';
      payload: TRefDate;
    }
  | {
      type: 'RESET';
    };

const INITIAL_STATE: State = {
  activeFile: null,
  transactions: [],
  csv: null
};

function reducer(state: State, action: Action): State {
  const { type } = action;
  switch (type) {
    case 'SET_DATA': {
      return {
        ...state,
        activeFile: action.payload.activeFile,
        transactions: action.payload.transactions,
        csv: action.payload.csv
      };
    }
    case 'SET_TRANSACTIONS': {
      return { ...state, csv: null, transactions: action.payload };
    }
    case 'SET_ACTIVE': {
      return { ...state, csv: null, activeFile: action.payload };
    }
    case 'RESET': {
      return { ...state, csv: null, activeFile: null, transactions: [] };
    }
    default:
      return state;
  }
}

export function useTransactionTree() {
  return useReducer(reducer, INITIAL_STATE);
}
