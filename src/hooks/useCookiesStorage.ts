import Cookies from 'js-cookie';
import { useState } from 'react';

export function useCookiesStorage(key: string) {
  const [value, setValue] = useState(() => Cookies.get(key) || null);

  const set = (newValue: string) => {
    Cookies.set(key, newValue, { expires: 1 });
    setValue(newValue);
  };

  return [value, set] as const;
}
