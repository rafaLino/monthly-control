import { useState } from 'react';

export function useAccessName() {
  const [value, setValue] = useState<string | null>(() => localStorage.getItem('access_name'));

  const set = (val: string) => {
    setValue(val);
    localStorage.setItem('access_name', val);
  };

  return [value, set] as const;
}
