import { TRefDate } from '@/types/refDate';
import { useReducer } from 'react';
import { Transaction } from '../types/transaction';
import { setMap } from '../utils';

type State = {
  activeFile: TRefDate | null;
  transactions: Transaction[];
  filesMap: Map<TRefDate, string>;
};

type Action =
  | {
      type: 'SET_DATA';
      payload: { activeFile: TRefDate; transactions: Transaction[]; csv: string | undefined };
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
    }
  | {
      type: 'RESET_ACTIVE';
    };

const INITIAL_STATE: State = {
  activeFile: null,
  transactions: [],
  filesMap: new Map<TRefDate, string>()
};

function reducer(state: State, action: Action): State {
  const { type } = action;
  switch (type) {
    case 'SET_DATA': {
      return {
        ...state,
        activeFile: action.payload.activeFile,
        transactions: action.payload.transactions,
        filesMap: setMap(state.filesMap, action.payload.activeFile, action.payload.csv)
      };
    }
    case 'SET_TRANSACTIONS': {
      return { ...state, transactions: action.payload };
    }
    case 'SET_ACTIVE': {
      return { ...state, activeFile: action.payload };
    }
    case 'RESET_ACTIVE': {
      return { ...state, activeFile: null };
    }
    case 'RESET': {
      return { ...state, activeFile: null, transactions: [] };
    }
    default:
      return state;
  }
}

export function useTransactions() {
  return useReducer(reducer, INITIAL_STATE);
}
