import { Register, RegisterType } from '@/types/register.types';

type ProjectionState = {
  incomes: Register[];
  expenses: Register[];
  investments: Register[];
};
type ProjectionAction =
  | {
      action?: never;
      id: string;
      type: RegisterType;
    }
  | { action: 'clear'; id?: never; type?: never };

export function reducer(state: ProjectionState, { action, id, type }: ProjectionAction) {
  if (action === 'clear') {
    return {
      incomes: state.incomes.map((i) => ({ ...i, checked: false })),
      expenses: state.expenses.map((e) => ({ ...e, checked: false })),
      investments: state.investments.map((i) => ({ ...i, checked: false }))
    };
  }
  return {
    ...state,
    [type]: state[type].map((record) => (record.id === id ? { ...record, checked: !record.checked } : record))
  };
}
