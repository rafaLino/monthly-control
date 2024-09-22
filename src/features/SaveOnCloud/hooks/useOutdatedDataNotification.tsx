import { ToastAction } from '@/components/ui/toast';
import { useToast } from '@/components/ui/use-toast';
import { useLocalStorage } from '@/hooks/useLocalStorage';
import { useServerVersion } from '@/hooks/useServerVersion';
import { isTruthy } from '@/lib/utils';
import { versionService } from '@/services/version.service';
import { useCallback, useEffect } from 'react';
import { useTranslation } from 'react-i18next';

function mustNotify(serverVersion: number | undefined, localVersion: number) {
  return isTruthy(serverVersion) && serverVersion !== localVersion;
}

export function useOutdatedDataNotification(action: () => Promise<void>) {
  const { t } = useTranslation();
  const [localVersion, setLocalVersion] = useLocalStorage<number>('version');
  const [serverVersion, setServerVersion] = useServerVersion();
  const { toast } = useToast();

  const dispatchNewVersion = useCallback(async () => {
    await versionService.increment();
    setLocalVersion((val) => val + 1);
    setServerVersion((val) => val + 1);
  }, []);

  const updateVersion = useCallback(async () => {
    await action();
    setServerVersion(localVersion);
  }, []);

  useEffect(() => {
    if (mustNotify(serverVersion, localVersion)) {
      toast({
        title: t('notification.title'),
        duration: Infinity,
        action: (
          <ToastAction altText="download" onClick={updateVersion}>
            {t('notification.action')}
          </ToastAction>
        )
      });
    }
  }, [serverVersion]);

  return { dispatchNewVersion };
}
