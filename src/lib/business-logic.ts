import { sum } from './utils';
import { Register } from '@/types/register.types';
import { Goal, StatusGoal } from '@/types/goal';


export function getPlannedBalance(registers: Array<Register>) {
    return sum(registers);
}
export function getDoneBalance(registers: Array<Register>) {
    return sum(registers.filter(({ checked }) => checked));
}

export function getBalance(registers: Array<Register>) {
    const planned = getPlannedBalance(registers);
    const done = getDoneBalance(registers);
    return { planned, done };
}


export function getTotalBalance(incomes: Array<Register>, expenses: Array<Register>, investments: Array<Register>) {
    const incomesBalance = getBalance(incomes);
    const expensesBalance = getBalance(expenses);
    const investmentsBalance = getBalance(investments);

    const spend = expensesBalance.planned + investmentsBalance.planned;
    const spendDone = expensesBalance.done + investmentsBalance.done;

    const balance = incomesBalance.planned - spend;
    const balanceDone = incomesBalance.done - spendDone;

    return [
        { balance, done: balanceDone },
        { balance: spend, done: spendDone }
    ] as const;
}

export function getIncomeGoal(incomes: Array<Register>, expenses: Array<Register>, investments: Array<Register>) {
    const incomesBalance = getPlannedBalance(incomes);
    const expensesBalance = getPlannedBalance(expenses);
    const investmentsBalance = getPlannedBalance(investments);

    const spend = expensesBalance + investmentsBalance;
    const balance = incomesBalance - spend;

    return incomesBalance > 0 ? (balance / incomesBalance) : 0;
}

export function getExpenseGoal(incomes: Array<Register>, expenses: Array<Register>) {
    const incomesBalance = getPlannedBalance(incomes);
    const expensesBalance = getPlannedBalance(expenses);

    return incomesBalance > 0 ? (expensesBalance / incomesBalance) : 0;
}

export function getInvestmentGoal(incomes: Array<Register>, investments: Array<Register>) {
    const incomesBalance = getPlannedBalance(incomes);
    const investmentsBalance = getPlannedBalance(investments);
    return incomesBalance > 0 ? (investmentsBalance / incomesBalance) : 0;
}

export function getIncomeGoalDone(incomes: Array<Register>, expenses: Array<Register>, investments: Array<Register>) {
    const incomesBalance = getDoneBalance(incomes);
    const expensesBalance = getDoneBalance(expenses);
    const investmentsBalance = getDoneBalance(investments);

    const spend = expensesBalance + investmentsBalance;
    const balance = incomesBalance - spend;

    return incomesBalance > 0 ? (balance / incomesBalance) : 0;
}

export function getExpenseGoalDone(incomes: Array<Register>, expenses: Array<Register>) {
    const incomesBalance = getDoneBalance(incomes);
    const expensesBalance = getDoneBalance(expenses);

    return incomesBalance > 0 ? (expensesBalance / incomesBalance) : 0;
}

export function getInvestmentGoalDone(incomes: Array<Register>, investments: Array<Register>) {
    const incomesBalance = getDoneBalance(incomes);
    const investmentsBalance = getDoneBalance(investments);
    return incomesBalance > 0 ? (investmentsBalance / incomesBalance) : 0;
}

export function getGoalResult(goal: Goal, incomeDone: number, expenseDone: number, investmentDone: number): StatusGoal {
    if (incomeDone <= goal.incomes && expenseDone <= goal.expenses && investmentDone >= goal.investments) {
        return 'OK'
    }
    else if (incomeDone > goal.incomes && expenseDone <= goal.expenses && investmentDone >= goal.investments) {
        return 'WARNING'
    }
    else {
        return 'NOK'
    }
}

