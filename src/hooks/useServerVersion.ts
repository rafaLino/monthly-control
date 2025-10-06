import env from '@/lib/env';
import { paramsService } from '@/services/params.service';
import { useEffect } from 'react';
import { useCookiesStorage } from './useCookiesStorage';

export function useServerVersion() {
  const [version, setVersion] = useCookiesStorage('server-version');

  useEffect(() => {
    async function get() {
      if (!version && env.VITE_ONLINE) {
        const newVersion = await paramsService.getVersion();
        setVersion(String(newVersion));
      }
    }
    get();
  }, []);

  const serverVersion = version ? +version : 0;

  const setServerVersion = (newVersion: number) => {
    setVersion(String(newVersion));
  };

  return [serverVersion, setServerVersion] as const;
}
