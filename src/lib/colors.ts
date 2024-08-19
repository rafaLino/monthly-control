import { StatusGoal } from '@/types/goal';
import { RegisterType } from '@/types/register.types';

export type ColorType = 'red' | 'green' | 'yellow';

export const COLORS = {
    red: {
        border: 'border-red-600',
        background: 'bg-red-50',
        text: 'text-red-500'
    },
    green: {
        border: 'border-green-600',
        background: 'bg-green-50',
        text: 'text-green-500'
    },
    yellow: {
        border: 'border-yellow-600',
        background: 'bg-yellow-50',
        text: 'text-yellow-500'
    },
};

export function getColor(type: RegisterType): ColorType {
    if (type === 'incomes') {
        return 'green';
    }
    else if (type === 'expenses') {
        return 'red';
    }
    else {
        return 'yellow';
    }
}

export function getGoalCardColor(status: StatusGoal): ColorType {
    if (status === 'OK')
        return 'green';
    else if (status === 'WARNING')
        return 'yellow';
    else
        return 'red';
}