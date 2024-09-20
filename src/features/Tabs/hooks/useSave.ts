import { saveRegisters } from '@/lib/fetch-registers';
import { getAll, useSync } from '@/store/store';
import { useCallback, useEffect } from 'react';

const THREE_SECONDS = 3_000;
const FIVE_MINUTES = 5 * 60 * 1000;
export function useSave() {
  const [syncing, setSyncing] = useSync();
  const save = useCallback(async () => {
    setSyncing(true);
    await saveRegisters(getAll());

    setTimeout(() => {
      setSyncing(false);
    }, THREE_SECONDS);
  }, []);

  useEffect(() => {
    const intervalId = setInterval(async () => {
      await save();
    }, FIVE_MINUTES);

    return () => clearInterval(intervalId);
  }, [save]);

  return [syncing, save] as const;
}
