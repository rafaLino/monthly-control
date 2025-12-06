import type { GlobalState, TemporalPartializedState } from '@/store';
import microDiff from 'microdiff';
import { shallow } from 'zustand/shallow';

function partialize(state: GlobalState) {
  const { incomes, expenses, investments } = state;
  return { incomes, expenses, investments };
}

function equality(pastState: TemporalPartializedState, currentState: TemporalPartializedState) {
  const areEquals = [
    shallow(pastState.incomes, currentState.incomes),
    shallow(pastState.expenses, currentState.expenses),
    shallow(pastState.investments, currentState.investments)
  ];
  return areEquals.every(Boolean);
}

function diff(pastState: Partial<TemporalPartializedState>, currentState: Partial<TemporalPartializedState>) {
  const result = microDiff(pastState, currentState, { cyclesFix: false }).at(0);

  if (result && result.type === 'CHANGE' && !result.path.includes('checked')) return pastState;

  return null;
}

export const temporalConfig = {
  partialize,
  equality,
  diff
};
