import randomColor from 'randomcolor';
import { startTransition, useEffect, useState } from 'react';

export function useColors(count: number) {
  const [colors, setColors] = useState<string[]>([]);

  useEffect(() => {
    startTransition(() => {
      setColors(generateColors(count));
    });
  }, [count]);

  return colors;
}

const generateColors = (count: number) => {
  return (previous: string[]) => {
    if (previous.length === 0) {
      return randomColor({ count, format: 'hsl', luminosity: 'bright' });
    }
    return count >= previous.length
      ? [...previous, randomColor({ format: 'hsl', luminosity: 'bright' })]
      : previous.toSpliced(-1);
  };
};
