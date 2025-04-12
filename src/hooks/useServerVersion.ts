import env from '@/lib/env';
import { paramsService } from '@/services/params.service';
import Cookies from 'js-cookie';
import { useEffect } from 'react';
import { useLocalStorage } from './useLocalStorage';

export function useServerVersion() {
  const [version, setVersion] = useLocalStorage<number>('server-version', 0);

  useEffect(() => {
    async function get() {
      if (!Cookies.get('fetch-version') && env.VITE_ONLINE) {
        const version = await paramsService.getVersion();
        setVersion(version);
        Cookies.set('fetch-version', String(version), { expires: 1 });
      }
    }
    get();
  }, []);

  return [version, setVersion] as const;
}
