import { KeyboardEvent } from 'react';
export function useOnEnter(callback: (e: KeyboardEvent) => void) {
    function handleKeyDown(event: KeyboardEvent) {
        if (event.key === 'Enter') {
            callback(event);
        }
    }

    return handleKeyDown;
}