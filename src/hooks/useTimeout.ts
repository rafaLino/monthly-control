import { useRef } from 'react';

let timeoutId: NodeJS.Timeout | null = null;
export function useTimeout(callback: () => void, delay = 100) {
  const callBackRef = useRef(callback);
  const run = () => {
    if (timeoutId) {
      clearTimeout(timeoutId);
    }
    timeoutId = setTimeout(callBackRef.current, delay);
  };

  return run;
}
