import env from '@/lib/env';
import { paramsService } from '@/services/params.service';
import { useEffect } from 'react';
import { useState } from 'react';
import { useCookiesStorage } from './useCookiesStorage';
import { useLocalStorage } from './useLocalStorage';

export function useCheckOutdatedData() {
  const [checked, setChecked] = useCookiesStorage('check-outdated-data');
  const [isOutdated, setIsOutdated] = useState(false);
  const [accessName] = useLocalStorage('access_name');
  useEffect(() => {
    async function get() {
      if (!checked && env.VITE_ONLINE) {
        const param = await paramsService.getParams('last_updated_access');
        setIsOutdated(param?.value !== accessName);
        setChecked(Date.now().toString());
      }
    }
    get();
  }, []);

  return { isOutdated, setIsOutdated };
}
