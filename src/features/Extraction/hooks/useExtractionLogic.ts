import { indexedDbService } from '@/services/indexeddb.service';
import { useActions } from '@/store/store';
import { ExtractionLog } from '@/types/extraction-log.types';
import { useCallback, useEffect, useState } from 'react';

async function fetchLogs(loader: (logs: Array<ExtractionLog>) => void) {
  await indexedDbService.init();
  const logs = await indexedDbService.getExtractionLogs();
  loader(logs);
}
export function useExtractionLogic() {
  const { loadExtractionLogs, addExtractionLogs, removeExtractionLog } = useActions();
  const [fetching, setFetching] = useState(false);

  useEffect(() => {
    fetchLogs(loadExtractionLogs);
  }, []);

  const extract = useCallback(async () => {
    const log: ExtractionLog = { id: crypto.randomUUID(), createdAt: new Date().toISOString(), notes: '' };
    // optimistic request.
    try {
      setFetching(true);
      //const promise = apiService.downloadUrl();
      addExtractionLogs(log);
      await indexedDbService.init();
      await indexedDbService.addExtractionLog(log);
    } catch (error) {
      removeExtractionLog(log.id);
      await indexedDbService.removeExtractionLogs(log.id);
    } finally {
      setFetching(false);
    }
  }, []);

  return { fetching, extract };
}
