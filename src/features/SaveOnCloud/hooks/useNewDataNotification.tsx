import { ToastAction } from '@/components/ui/toast';
import { useToast } from '@/components/ui/use-toast';
import { useQueue } from '@/hooks/useQueue';
import Cookies from 'js-cookie';
import { useCallback, useEffect, useRef } from 'react';

function incrementVersion() {
  const versionString = Cookies.get('version') ?? 0;
  const versionAsNumber = Number(versionString);
  const newVersion = String(versionAsNumber + 1);
  Cookies.set('version', newVersion, { expires: 20 });
  return newVersion;
}

export function useNewDataNotification(action: () => Promise<void>) {
  const [{ data, ack }, send] = useQueue();
  const { toast } = useToast();
  const currentVersionRef = useRef(Cookies.get('version') ?? '0');

  const publish = useCallback(async () => {
    const version = incrementVersion();
    currentVersionRef.current = version;
    await send(version);
  }, []);

  const getNewData = useCallback(async () => {
    await action();
    ack?.();
    Cookies.set('version', data!);
  }, []);

  useEffect(() => {
    if (data && currentVersionRef.current !== data) {
      toast({
        title: 'ℹ️ New version available! ',
        duration: Infinity,
        action: (
          <ToastAction altText="download" onClick={getNewData}>
            Get new version
          </ToastAction>
        )
      });
    }
  }, [data]);

  return { publish };
}
