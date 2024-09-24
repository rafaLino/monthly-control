import { ScrollArea } from '@/components/ui/scroll-area';
import { Separator } from '@/components/ui/separator';
import { indexedDbService } from '@/services/indexeddb.service';
import { useActions, useExtractions } from '@/store/store';
import { Fragment } from 'react';
import { useTranslation } from 'react-i18next';
import { LogItem } from './log-item';

export const ExtractionLogs = () => {
  const { t } = useTranslation();
  const logs = useExtractions();
  const { setExtractionLogNote } = useActions();

  const handleChange = async (logId: string, notes: string) => {
    setExtractionLogNote(logId, notes);
    await indexedDbService.init();
    await indexedDbService.updateExtractionLogs(logId, notes);
  };
  return (
    <ScrollArea className="h-72 w-96 rounded-md border">
      {logs.length > 0 ? (
        <div className="p-4">
          <h4 className="mb-4 text-sm font-medium leading-none">{t('logs.title')}</h4>
          {logs.map((log) => (
            <Fragment key={log.id}>
              <LogItem log={log} onChange={handleChange} />
              <Separator className="my-2" />
            </Fragment>
          ))}
        </div>
      ) : (
        <div className="flex items-center justify-center h-64 font-bold">{t('logs.noData')}</div>
      )}
    </ScrollArea>
  );
};
