import { apiService } from '@/services/api.service';
import { indexedDbService } from '@/services/indexeddb.service';
import { useActions } from '@/store/store';
import { ExtractionLog } from '@/types/extraction-log.types';
import { useCallback, useEffect, useState } from 'react';

async function fetchLogs(loader: (logs: Array<ExtractionLog>) => void) {
  await indexedDbService.init();
  const logs = await indexedDbService.getExtractionLogs();
  loader(logs);
}
let controller: AbortController | null;
export function useExtractionLogic() {
  const { loadExtractionLogs, addExtractionLogs, removeExtractionLog } = useActions();
  const [fetching, setFetching] = useState(false);

  useEffect(() => {
    fetchLogs(loadExtractionLogs);

    return () => controller?.abort();
  }, []);

  const extract = useCallback(async () => {
    const log: ExtractionLog = { id: crypto.randomUUID(), createdAt: new Date().toISOString(), notes: '' };
    // optimistic request.
    try {
      controller = new AbortController();
      setFetching(true);
      const promise = apiService.downloadUrl(controller.signal);
      addExtractionLogs(log);
      await indexedDbService.init();
      await indexedDbService.addExtractionLog(log);

      const url = await promise;
      url && window.open(url, '_self');
    } catch (error) {
      removeExtractionLog(log.id);
      await indexedDbService.removeExtractionLogs(log.id);
    } finally {
      setFetching(false);
    }
  }, []);

  const cancel = useCallback(() => {
    controller?.abort();
  }, []);

  return { fetching, extract, cancel };
}
