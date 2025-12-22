import env from '@/lib/env';
import { paramsService } from '@/services/params.service';
import { useEffect, useState } from 'react';
import { useCookiesStorage } from './useCookiesStorage';
import { useLocalStorage } from './useLocalStorage';

function checkIsOutdatedData(localAccessName: string | null, lastUpdatedAccess: string | undefined) {
  if (!localAccessName || !lastUpdatedAccess) return false;
  return localAccessName !== lastUpdatedAccess;
}

export function useCheckOutdatedData() {
  const [checked, setChecked] = useCookiesStorage('check-outdated-data');
  const [isOutdated, setIsOutdated] = useState(false);
  const [accessName] = useLocalStorage('access_name');
  useEffect(() => {
    async function get() {
      if (!checked && env.VITE_ONLINE) {
        const param = await paramsService.getParams('last_updated_access');
        setIsOutdated(checkIsOutdatedData(accessName, param?.value));
        setChecked(Date.now().toString());
      }
    }
    get();
  }, [accessName]);

  return { isOutdated, setIsOutdated };
}
