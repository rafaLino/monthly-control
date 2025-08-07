import { Register, RegisterType } from '@/types/register.types';

export function reducer(
  state: { incomes: Register[]; expenses: Register[]; investments: Register[] },
  action: { id: string; type: RegisterType }
) {
  return {
    ...state,
    [action.type]: state[action.type].map((record) =>
      record.id === action.id ? { ...record, checked: !record.checked } : record
    )
  };
}
