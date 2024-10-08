import { ToastAction } from '@/components/ui/toast';
import { useToast } from '@/components/ui/use-toast';
import { useLocalStorage } from '@/hooks/useLocalStorage';
import { useServerVersion } from '@/hooks/useServerVersion';
import { versionService } from '@/services/version.service';
import { useCallback, useEffect } from 'react';
import { useTranslation } from 'react-i18next';

function mustNotify(serverVersion: number | undefined, localVersion: number) {
  return serverVersion && serverVersion !== localVersion;
}

export function useOutdatedDataNotification(action: () => Promise<void>) {
  const { t } = useTranslation();
  const [localVersion, setLocalVersion] = useLocalStorage<number>('version', 0);
  const [serverVersion, setServerVersion] = useServerVersion();
  const { toast } = useToast();

  const dispatchNewVersion = useCallback(async () => {
    await versionService.increment();
    setServerVersion(serverVersion + 1);
    setLocalVersion(serverVersion + 1);
  }, [serverVersion]);

  const updateVersion = useCallback(async () => {
    await action();
    setLocalVersion(serverVersion!);
  }, [serverVersion]);

  useEffect(() => {
    if (mustNotify(serverVersion, localVersion)) {
      const timeout = setTimeout(() => {
        toast({
          title: t('notification.title'),
          duration: Infinity,
          action: (
            <ToastAction altText="download" onClick={updateVersion}>
              {t('notification.action')}
            </ToastAction>
          )
        });
      }, 1_000);
      return () => clearTimeout(timeout);
    }
  }, [serverVersion, localVersion, toast]);

  return { dispatchNewVersion };
}
