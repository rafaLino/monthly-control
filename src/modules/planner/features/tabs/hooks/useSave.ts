import env from '@/lib/env';
import { saveRegisters } from '@/lib/fetch-registers';
import { getAll, useLocalParams, useSync } from '@/store';
import { useCallback, useEffect } from 'react';

const THREE_SECONDS = 3_000;
const FIVE_MINUTES = 5 * 60 * 1000;

export function useSave() {
  const [syncing, setSyncing] = useSync();
  const [autoSave] = useLocalParams('auto_save')

  const save = useCallback(async () => {
    setSyncing(true);
    await saveRegisters(getAll());
    setTimeout(() => {
      setSyncing(false);
    }, THREE_SECONDS);
  }, []);

  useEffect(() => {
    if (env.MODE === 'test' || !autoSave) return;
    const intervalId = setInterval(save, FIVE_MINUTES);
    return () => clearInterval(intervalId);
  }, [save]);

  return [syncing, save] as const;
}
