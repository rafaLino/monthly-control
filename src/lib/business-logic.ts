import { SetRegistersActionType } from '@/store/global.state';
import { Goal, StatusGoal } from '@/types/goal';
import { Register } from '@/types/register.types';
import { addNewItemToArray, createNewRegister, removeItemFromArray, sum, updateItemOfArray } from './utils';

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

  return incomesBalance > 0 ? balance / incomesBalance : 0;
}

export function getExpenseGoal(incomes: Array<Register>, expenses: Array<Register>) {
  const incomesBalance = getPlannedBalance(incomes);
  const expensesBalance = getPlannedBalance(expenses);

  return incomesBalance > 0 ? expensesBalance / incomesBalance : 0;
}

export function getInvestmentGoal(incomes: Array<Register>, investments: Array<Register>) {
  const incomesBalance = getPlannedBalance(incomes);
  const investmentsBalance = getPlannedBalance(investments);
  return incomesBalance > 0 ? investmentsBalance / incomesBalance : 0;
}

export function getIncomeGoalDone(incomes: Array<Register>, expenses: Array<Register>, investments: Array<Register>) {
  const incomesBalance = getDoneBalance(incomes);
  const expensesBalance = getDoneBalance(expenses);
  const investmentsBalance = getDoneBalance(investments);

  const spend = expensesBalance + investmentsBalance;
  const balance = incomesBalance - spend;

  return incomesBalance > 0 ? balance / incomesBalance : 0;
}

export function getExpenseGoalDone(incomes: Array<Register>, expenses: Array<Register>) {
  const incomesBalance = getDoneBalance(incomes);
  const expensesBalance = getDoneBalance(expenses);

  return incomesBalance > 0 ? expensesBalance / incomesBalance : 0;
}

export function getInvestmentGoalDone(incomes: Array<Register>, investments: Array<Register>) {
  const incomesBalance = getDoneBalance(incomes);
  const investmentsBalance = getDoneBalance(investments);
  return incomesBalance > 0 ? investmentsBalance / incomesBalance : 0;
}

export function getGoalResult(goal: Goal, incomes: number, expenses: number, investments: number): StatusGoal {
  if (incomes >= 0 && incomes <= goal.incomes && expenses <= goal.expenses && investments >= goal.investments) {
    return 'OK';
  } else if (incomes > goal.incomes && expenses <= goal.expenses && investments >= goal.investments) {
    return 'WARNING';
  } else {
    return 'NOK';
  }
}

export function setRegisters(data: Array<Register>, action: SetRegistersActionType): Array<Register> {
  const { type, payload } = action;
  switch (type) {
    case 'add':
      return addNewItemToArray(data, createNewRegister(payload.name));
    case 'update': {
      return updateItemOfArray(data, payload.value, (item) => item.id === payload.id);
    }
    case 'remove': {
      return removeItemFromArray(data, (item) => item.id === payload.id);
    }
    case 'checkAll': {
      return data.map((item) => ({
        ...item,
        checked: payload.value === 'indeterminate' ? true : payload.value
      }));
    }
  }
}
