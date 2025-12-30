import { CurrencyItem } from '@/components/currency-item';
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
import { Actions, type TAction } from './components/actions';
import { Files } from './components/files';
import { Summary } from './components/summary';
import { TransactionsDropZone } from './components/transactions-drop-zone';
import { useFilesQuery } from './hooks/useFilesQuery';
import { useTransactionTree } from './hooks/useTransactionTree';
import { useTransactionsQuery } from './hooks/useTransactionsQuery';
import type { Transaction } from './types/transaction';
import { getRefDateFromTransactions } from './utils';

export function TransactionsPage() {
  const { t } = useTranslation('translation');
  const [isPending, startTransition] = useTransition();

  const [{ activeFile, csv, transactions }, dispatch] = useTransactionTree();
  const {
    data: fileData,
    isLoading,
    isSaving,
    isRemoving,
    save,
    remove,
    refetch
  } = useFilesQuery((action) => {
    action === 'remove' && dispatch({ type: 'RESET' });
  });
  const isTransactionLoading = useTransactionsQuery(csv ? null : activeFile, (data) => {
    dispatch({ type: 'SET_TRANSACTIONS', payload: data });
  });

  const loading = isPending || isLoading || isTransactionLoading;

  const handleDrop = async (items: Transaction[], csv: string) => {
    startTransition(() => {
      const ref = getRefDateFromTransactions(items);
      dispatch({ type: 'SET_DATA', payload: { activeFile: ref, transactions: items, csv: csv } });
    });
  };

  const handleFileClick = async (event: MouseEvent<HTMLButtonElement>) => {
    const { state, value } = event.currentTarget.dataset as { state: string; value: string };

    if (state === 'new') {
      startTransition(() => {
        dispatch({ type: 'SET_TRANSACTIONS', payload: CSVtoObject(csv!) });
      });
      return;
    }

    if (state === 'opened') {
      dispatch({ type: 'RESET' });
      return;
    }

    dispatch({ type: 'SET_ACTIVE', payload: value });
  };

  const handleActions = (action: TAction) => {
    switch (action) {
      case 'save': {
        if (activeFile && csv) {
          save({ ref: activeFile, csv });
        }
        break;
      }
      case 'refetch': {
        refetch();
        break;
      }
      case 'reset': {
        dispatch({ type: 'RESET' });
        break;
      }
      case 'remove': {
        activeFile && remove(activeFile);
      }
    }
  };

  return (
    <div className="grid grid-flow-row grid-cols-1 sm:grid-cols-2 gap-2 w-full h-full">
      <Files items={fileData} active={activeFile} onClick={handleFileClick} />
      <Actions
        disabled={!activeFile}
        slots={{
          save: { disabled: isSaving },
          reset: { disabled: isLoading },
          refetch: { disabled: isLoading },
          remove: { disabled: isRemoving }
        }}
        onClick={handleActions}
      />
      <div className="flex flex-col col-span-2 w-full items-center">
        <TransactionsDropZone showDropZone={transactions.length === 0} onDrop={handleDrop}>
          <Summary refDate={activeFile} items={transactions} />
          <Loading
            loading={loading}
            fallback={
              <div className="flex min-h-100 items-center justify-center w-full col-span-3">
                <span className="animate-pulse">{t('transactions.loading')}</span>
              </div>
            }
          >
            <NavigationScrollArea type="scroll" className="h-130 sm:h-150 w-full rounded-md overflow-y-hidden col-span-3">
              <Timeline orientation="vertical" noCards vertItemSpacing={60}>
                {transactions.map((item) => (
                  <TimelineItem key={item.id} variant="outline">
                    <TimelineItemDate>{t('date', { date: item.date, context: { format: 'dd/MM/yy' } })}</TimelineItemDate>
                    <TimelineItemTitle>
                      <CurrencyItem value={Number(item.amount)} color={{ true: 'text-gray-800', false: 'text-green-500' }} />
                    </TimelineItemTitle>
                    <TimelineItemDescription>{item.title}</TimelineItemDescription>
                  </TimelineItem>
                ))}
              </Timeline>
            </NavigationScrollArea>
          </Loading>
        </TransactionsDropZone>
      </div>
    </div>
  );
}
