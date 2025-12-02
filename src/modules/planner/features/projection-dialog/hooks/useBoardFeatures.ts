import { getAll } from '@/store';
import { Register, RegisterType } from '@/types/register.types';
import { useCallback, useMemo, useState } from 'react';
import { boardSnapshot } from '../utils/board-snapshot';

const toFeature = (type: RegisterType) => (item: Register) => ({
  column: 'nogroup',
  id: item.id,
  name: item.name,
  value: item.value,
  color: type === 'expenses' ? 'bg-red-500' : 'bg-yellow-500'
});

const groupCosts = (expenses: Register[], investments: Register[]) => {
  return expenses.map(toFeature('expenses')).concat(investments.map(toFeature('investments')));
};

const getFeatures = () => {
  const { expenses, investments } = getAll();
  const snapshot = boardSnapshot.getBoardSnapshot();

  if (!snapshot) {
    return groupCosts(expenses, investments);
  }

  if (snapshot.features.length !== expenses.length + investments.length) {
    return groupCosts(expenses, investments);
  }

  return snapshot.features;
};

export function useBoardFeatures() {
  const [features, setFeatures] = useState(() => getFeatures());

  const totals = useMemo(() => {
    return features.reduce(
      (acc, feature) => {
        return {
          ...acc,
          [feature.column]: (acc[feature.column] ?? 0) + (feature.value ?? 0)
        };
      },
      {} as Record<string, number>
    );
  }, [features]);

  const moveFeatures = useCallback((target: string, source: string) => {
    setFeatures((prevFeatures) =>
      prevFeatures.map((feature) => (feature.column === source ? { ...feature, column: target } : feature))
    );
  }, []);

  return {
    features,
    totals,
    setFeatures,
    moveFeatures
  };
}
