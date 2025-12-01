import { getAll } from '@/store';
import { useCallback, useMemo, useState } from 'react';

export function useBoardFeatures() {
  const [features, setFeatures] = useState(() => {
    const { expenses, investments } = getAll();
    const expenseFeatures = expenses.map((item) => ({
      column: 'nogroup',
      id: item.id,
      name: item.name,
      value: item.value,
      color: 'bg-red-500'
    }));

    const investmentFeatures = investments.map((item) => ({
      column: 'nogroup',
      id: item.id,
      name: item.name,
      value: item.value,
      color: 'bg-yellow-500'
    }));

    return expenseFeatures.concat(investmentFeatures);
  });

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
