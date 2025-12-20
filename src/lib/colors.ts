import { StatusGoal } from '@/types/goal';
import { RegisterType } from '@/types/register.types';

export type ColorType = 'red' | 'green' | 'yellow';

export const COLORS = {
  red: {
    border: 'border-red-600 dark:border-red-700',
    background: 'bg-red-50 dark:bg-red-900',
    text: 'text-red-500 dark:text-red-400'
  },
  green: {
    border: 'border-green-600 dark:border-green-700',
    background: 'bg-green-50 dark:bg-green-900',
    text: 'text-green-500 dark:text-green-400'
  },
  yellow: {
    border: 'border-yellow-600 dark:border-yellow-700',
    background: 'bg-yellow-50 dark:bg-yellow-900',
    text: 'text-yellow-500 dark:text-yellow-400'
  }
};

export function getColor(type: RegisterType): ColorType {
  if (type === 'incomes') {
    return 'green';
  } else if (type === 'expenses') {
    return 'red';
  } else {
    return 'yellow';
  }
}

export function getGoalCardColor(status: StatusGoal): ColorType {
  if (status === 'OK') return 'green';
  else if (status === 'WARNING') return 'yellow';
  else return 'red';
}

export function getColorClasses(type: RegisterType) {
  return COLORS[getColor(type)];
}
