import { useState } from 'react';

export function useSet<T extends string | number | boolean>(initialValues = new Set<T>()) {
  const [set, setSet] = useState<Set<T>>(initialValues);

  const add = (value: T) => {
    if (set.has(value)) return;

    setSet((prev) => {
      const newSet = new Set(prev);
      newSet.add(value);
      return newSet;
    });
  };

  const remove = (value: T) => {
    if (!set.has(value)) return;

    setSet((prev) => {
      const newSet = new Set(prev);
      newSet.delete(value);
      return newSet;
    });
  };

  const toggle = (value: T) => {
    setSet((prev) => {
      const newSet = new Set(prev);
      if (newSet.has(value)) {
        newSet.delete(value);
      } else {
        newSet.add(value);
      }
      return newSet;
    });
  };

  const clear = () => {
    setSet(new Set());
  };

  const has = (value: T) => set.has(value);

  const size = () => set.size;

  const keys = () => Array.from(set.keys());

  const values = () => Array.from(set.values());

  const entries = () => Array.from(set.entries());

  return { add, remove, toggle, clear, has, size, keys, values, entries } as const;
}
