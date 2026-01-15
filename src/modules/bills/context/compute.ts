import { sumItems } from '@/lib/utils';
import { Bill, User } from '../types';

export type BillsContextType = ReturnType<typeof computeBills>;

export function computeBills(bills: Bill[], users: User[]) {
  const totalBills = sumItems(bills, (bill) => bill.amount);
  const totalIncomes = sumItems(users, (user) => user.amount);
  const remaining = totalIncomes - totalBills;
  const billsPercentage = totalBills / totalIncomes;

  const billsPerYear = totalBills * 12;
  const incomesPerYear = totalIncomes * 12;
  const remainingPerYear = incomesPerYear - billsPerYear;

  const calculateUserShare = (user: User) => {
    return user.amount * billsPercentage;
  };

  const calculateUserRemaining = (user: User) => {
    return user.amount - calculateUserShare(user);
  };

  const calculateBillPercentage = (bill: Bill) => {
    return bill.amount / totalBills;
  };

  return {
    bills: totalBills,
    incomes: totalIncomes,
    remaining,
    percentage: billsPercentage,
    remainingPerYear,
    incomesPerYear,
    billsPerYear,
    calculateUserShare,
    calculateUserRemaining,
    calculateBillPercentage
  };
}
