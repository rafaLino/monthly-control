import { Loading } from '@/components/loading';
import { NavigationScrollArea } from '@/components/navigation-scroll-area';
import {
  Timeline,
  TimelineItem,
  TimelineItemDate,
  TimelineItemDescription,
  TimelineItemTitle
} from '@/components/ui/8star-labs/timeline';
import { CSVtoObject } from '@/lib/csv-to-object';
import { MouseEvent, useTransition } from 'react';
import { useTranslation } from 'react-i18next';
import { Actions } from './components/actions';
import { Files } from './components/files';
import { Summary } from './components/summary';
import { TransactionsDropZone } from './components/transactions-drop-zone';
import { useFilesQuery } from './hooks/useFilesQuery';
import { useTransactions } from './hooks/useTransactions';
import { useTransactionsQuery } from './hooks/useTransactionsQuery';
import type { Transaction } from './types/transaction';
import { getRefDateFromTransactions } from './utils';

export function TransactionModule() {
  const { t } = useTranslation('translation');
  const [isPending, startTransition] = useTransition();

  const [{ activeFile, filesMap, transactions }, dispatch] = useTransactions();
  const { data: fileData, isLoading, isSaving, save, refetch } = useFilesQuery();
  const isTransactionLoading = useTransactionsQuery(activeFile, (data) => {
    dispatch({ type: 'SET_TRANSACTIONS', payload: data });
  });

  const loading = isPending || isLoading || isTransactionLoading;

  const handleDrop = async (items: Transaction[], csv: string) => {
    startTransition(() => {
      const ref = getRefDateFromTransactions(items);
      dispatch({ type: 'SET_DATA', payload: { activeFile: ref, transactions: items, csv: csv } });
    });
  };

  const handleSave = () => {
    if (activeFile && filesMap.has(activeFile)) {
      save({ ref: activeFile, csv: filesMap.get(activeFile)! });
    }
  };

  const handleFileClick = async (event: MouseEvent<HTMLButtonElement>) => {
    const { state, value } = event.currentTarget.dataset as { state: string; value: string };

    if (state === 'new') {
      startTransition(() => {
        dispatch({ type: 'SET_TRANSACTIONS', payload: CSVtoObject(filesMap.get(value)!) });
      });
      return;
    }

    if (state === 'opened') {
      dispatch({ type: 'RESET' });
      return;
    }

    dispatch({ type: 'SET_ACTIVE', payload: value });
  };

  const handleReset = () => {
    dispatch({ type: 'RESET' });
  };

  const handleRefetch = () => {
    refetch();
  };

  return (
    <div className="grid grid-flow-row grid-cols-1 sm:grid-cols-3 gap-2 w-full">
      <Files items={fileData} active={activeFile} onClick={handleFileClick} />
      <TransactionsDropZone showDropZone={transactions.length === 0} onDrop={handleDrop}>
        <Summary label={t('transactions.summary')} refDate={activeFile} items={transactions} />
        <Actions.Root>
          <Actions.Btn label={t('transactions.reset')} onClick={handleReset} />
          <Actions.Btn label={t('transactions.refetch')} disabled={isLoading} onClick={handleRefetch} />
          <Actions.Save
            label={t('transactions.save')}
            active={!!activeFile && transactions.length === 0}
            disabled={isSaving}
            onClick={handleSave}
          />
        </Actions.Root>
        <Loading
          loading={loading}
          fallback={
            <div className="flex min-h-100 items-center justify-center w-full col-span-3">
              <span className="animate-pulse">{t('transactions.loading')}</span>
            </div>
          }
        >
          <NavigationScrollArea type="scroll" className="h-145 sm:h-160 w-full rounded-md overflow-y-hidden col-span-3">
            <Timeline orientation="vertical" noCards vertItemSpacing={60}>
              {transactions.map((item) => (
                <TimelineItem key={item.id} variant="outline">
                  <TimelineItemDate>{t('date', { date: item.date, context: { format: 'dd/MM/yy' } })}</TimelineItemDate>
                  <TimelineItemTitle>{t('currency', { value: item.amount })}</TimelineItemTitle>
                  <TimelineItemDescription>{item.title}</TimelineItemDescription>
                </TimelineItem>
              ))}
            </Timeline>
          </NavigationScrollArea>
        </Loading>
      </TransactionsDropZone>
    </div>
  );
}
