import randomColor from 'randomcolor';
import { useEffect, useRef } from 'react';

export function useColors(count: number) {
  const colorsRef = useRef(randomColor({ count, format: 'hsl', luminosity: 'bright' }));
  const countRef = useRef(count);

  useEffect(() => {
    if (colorsRef.current && countRef.current !== count) {
      colorsRef.current = colorsRef.current.concat(randomColor({ format: 'hsl', luminosity: 'bright' }));
    }
  }, [count]);

  return colorsRef.current;
}
