import { usePrevious } from '@/hooks/usePrevious';
import randomColor from 'randomcolor';
import { useEffect, useState } from 'react';

export function useColors(count: number) {
  const [colors, setColors] = useState(randomColor({ count, format: 'hsl', luminosity: 'bright' }));
  const prevCount = usePrevious(count, 0);
  useEffect(() => {
    if (prevCount > 0) {
      setColors((prev) => {
        if (count > prevCount) return [...prev, randomColor({ format: 'hsl', luminosity: 'bright' })];

        return prev.toSpliced(prev.length - 1);
      });
    }
  }, [count, prevCount]);

  return colors;
}
