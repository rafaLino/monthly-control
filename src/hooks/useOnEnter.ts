import { KeyboardEvent } from 'react';
export function useOnEnter<T extends HTMLElement>(callback: (e: KeyboardEvent<T>) => void) {
  function handleKeyDown(event: KeyboardEvent<T>) {
    if (event.key === 'Enter') {
      callback(event);
    }
  }

  return handleKeyDown;
}
