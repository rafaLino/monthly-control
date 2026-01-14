import { useRef } from 'react';

const nameWithValueRegex = new RegExp(/^(?!\/)[^\d.,]+ \d+(?:\.\d{1,3})*(?:,\d{1,2})?$/);
const TAKE_VALUE_REGEX = /\s(?=\d+(?:,\d+)?|\d+\.\d+(?:,\d+)?$)/;

export function useAddInput(fn: (name: string, value: number) => void) {
  const ref = useRef<HTMLInputElement>(null);
  const onEnter = (event: React.KeyboardEvent<HTMLInputElement>) => {
    if (event.key === 'Enter' && ref.current) {
      event.preventDefault();
      if (nameWithValueRegex.test(event.currentTarget.value)) {
        const [name, value] = event.currentTarget.value.split(TAKE_VALUE_REGEX).filter(Boolean);
        ref.current.value = '';
        return fn(name.trim(), parseFloat(value));
      }

      fn(event.currentTarget.value.trim(), 0);
      ref.current.value = '';
    }
  };

  return { ref, onEnter };
}
