import randomColor from 'randomcolor';
import { startTransition, useEffect, useState } from 'react';

const generateColors = (previous: string[], count: number) => {
  if (previous.length === 0) {
    return randomColor({ count, format: 'hsl', luminosity: 'bright' });
  }
  return count >= previous.length ? [...previous, randomColor({ format: 'hsl', luminosity: 'bright' })] : previous.toSpliced(-1);
};

export function useColors(count: number) {
  const [colors, setColors] = useState<string[]>([]);

  useEffect(() => {
    startTransition(() => {
      setColors((prev) => generateColors(prev, count));
    });
  }, [count]);

  return colors;
}
