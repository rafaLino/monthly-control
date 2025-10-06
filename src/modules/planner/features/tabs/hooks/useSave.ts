import { useUpdateLocalVersion } from '@/hooks/useDataVersion';
import { saveRegisters } from '@/lib/fetch-registers';
import { getAll, useSync } from '@/store';
import { useCallback, useEffect } from 'react';

const THREE_SECONDS = 3_000;
const FIVE_MINUTES = 5 * 60 * 1000;

export function useSave() {
  const [syncing, setSyncing] = useSync();
  const { updateLocalVersion } = useUpdateLocalVersion();

  const save = useCallback(async () => {
    setSyncing(true);
    await saveRegisters(getAll());

    setTimeout(() => {
      setSyncing(false);
      updateLocalVersion();
    }, THREE_SECONDS);
  }, []);

  useEffect(() => {
    if (import.meta.env.MODE === 'test') return;
    const intervalId = setInterval(save, FIVE_MINUTES);
    return () => clearInterval(intervalId);
  }, [save]);

  return [syncing, save] as const;
}
