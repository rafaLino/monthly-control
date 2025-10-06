import { paramsService } from '@/services/params.service';
import { useCookiesStorage } from './useCookiesStorage';
import { useLocalStorage } from './useLocalStorage';
import { useServerVersion } from './useServerVersion';

export function useDataVersion() {
  const [localVersion, setLocalVersion] = useLocalStorage<number>('local-version', 0);
  const [serverVersion, setServerVersion] = useServerVersion();

  const syncServerVersion = () => {
    setServerVersion(localVersion);

    paramsService.incrementVersion();
  };

  const syncLocalVersion = () => {
    setLocalVersion(serverVersion);
  };

  const isLocalOutdated = serverVersion > localVersion;

  const isServerOutdated = localVersion > serverVersion;

  return {
    isLocalOutdated,
    isServerOutdated,
    syncServerVersion,
    syncLocalVersion
  };
}

export function useUpdateLocalVersion() {
  const [localVersion, setLocalVersion] = useLocalStorage<number>('local-version', 0);
  const [serverVersion] = useCookiesStorage('server-version');

  const updateLocalVersion = () => {
    if (localVersion !== Number(serverVersion)) {
      return;
    }
    setLocalVersion((prev) => prev + 1);
  };

  return { updateLocalVersion };
}
