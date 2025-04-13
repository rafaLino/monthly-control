import { useState } from 'react';

export function usePrevious<T>(value: T, initialPreviouValue: T) {
  const [current, setCurrent] = useState<T>(value);
  const [previous, setPrevious] = useState<T>(initialPreviouValue);

  if (value !== current) {
    setPrevious(current);
    setCurrent(value);
  }

  return previous;
}
