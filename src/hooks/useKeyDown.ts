import { useEffect, useEffectEvent } from 'react';

type KeyEvent = `alt.${string}` | `ctrl.${string}` | `shift.${string}` | string;

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

export function useKeyDown(key: KeyEvent, callback?: () => void) {
  const handleKeyDown = useEffectEvent((event: KeyboardEvent) => {
    if (key === modifiedKey(event)) {
      event.preventDefault();
      callback?.();
    }
  });

  useEffect(() => {
    globalThis.addEventListener('keydown', handleKeyDown);
    return () => {
      globalThis.removeEventListener('keydown', handleKeyDown);
    };
  }, []);
}

export function useKeysDown<KE extends KeyEvent>(control: { [key in KE]: () => void }) {
  const handleKeyDown = useEffectEvent((event: KeyboardEvent) => {
    const mKey = modifiedKey(event) as KE;
    if (control[mKey]) {
      event.preventDefault();
      control[mKey]?.();
    }
  });

  useEffect(() => {
    globalThis.addEventListener('keydown', handleKeyDown);
    return () => {
      globalThis.removeEventListener('keydown', handleKeyDown);
    };
  }, []);
}
