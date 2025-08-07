import { useCallback, useEffect } from 'react';

type keyEvent = `alt.${string}` | `ctrl.${string}` | `shift.${string}` | string;

function modifiedKey(event: KeyboardEvent): string {
  if (event.altKey) {
    return `alt.${event.key}`;
  }
  if (event.ctrlKey) {
    return `ctrl.${event.key}`;
  }
  if (event.shiftKey) {
    return `shift.${event.key}`;
  }
  return event.key;
}

export function useKeyDown(key: keyEvent, callback?: () => void) {
  const handleKeyDown = useCallback(
    (event: KeyboardEvent) => {
      if (key === modifiedKey(event)) {
        event.preventDefault();
        callback?.();
      }
    },
    [key, callback]
  );

  useEffect(() => {
    window.addEventListener('keydown', handleKeyDown);
    return () => {
      window.removeEventListener('keydown', handleKeyDown);
    };
  }, [handleKeyDown]);
}
