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
import { TRefDate } from '@/types/refDate';
import { MouseEvent, useState, useTransition } from 'react';
import { useTranslation } from 'react-i18next';
import { Actions } from './components/actions';
import { Files } from './components/files';
import { Summary } from './components/summary';
import { TransactionsDropZone } from './components/transactions-drop-zone';
import { useFilesQuery } from './hooks/useFilesQuery';
import { useTransactionsQuery } from './hooks/useTransactionsQuery';
import type { Transaction } from './types/transaction';
import { getRefDateFromTransactions } from './utils/get-ref-from-transactions';

export function TransactionModule() {
  const { t } = useTranslation('translation');
  const [csvs, setCsvs] = useState<Map<TRefDate, string>>(new Map());
  const [transactions, setTransactions] = useState<Transaction[]>([]);
  const [activeFileRef, setActiveFileRef] = useState<TRefDate | null>(null);

  const { data: fileData, isLoading, isSaving, save, refetch } = useFilesQuery({ setActiveFileRef });
  const isTransactionLoading = useTransactionsQuery({ ref: activeFileRef, setTransactions });
  const [isPending, startTransition] = useTransition();

  const loading = isPending || isLoading || isTransactionLoading;

  const handleDrop = async (items: Transaction[], csv?: string) => {
    startTransition(() => {
      setTransactions(items);
      const ref = getRefDateFromTransactions(items);
      setActiveFileRef(ref);
      setCsvs((prev) => new Map(prev).set(ref, csv!));
    });
  };

  const handleSave = () => {
    console.log('saving... ');
    if (activeFileRef) {
      save({ ref: activeFileRef, csv: csvs.get(activeFileRef)! });
    }
  };

  const handleFileClick = async (event: MouseEvent<HTMLButtonElement>) => {
    const { state, value } = event.currentTarget.dataset as { state: string; value: string };

    if (state === 'new') {
      startTransition(() => {
        setTransactions(CSVtoObject(csvs.get(value)!));
      });
      return;
    }

    if (state === 'opened') {
      handleReset();
      return;
    }

    setActiveFileRef(value);
  };

  const handleReset = () => {
    setActiveFileRef(null);
    setTransactions([]);
  };

  return (
    <div className="grid grid-flow-row grid-cols-1 sm:grid-cols-3 gap-2 w-full">
      <Files items={fileData} active={activeFileRef} onClick={handleFileClick} />
      <TransactionsDropZone showDropZone={transactions.length === 0} onDrop={handleDrop}>
        <Summary refDate={activeFileRef} items={transactions} />
        <Actions
          saving={isSaving}
          unsaved={!!activeFileRef}
          onRefetch={() => refetch()}
          onSave={handleSave}
          onReset={handleReset}
        />
        <Loading
          loading={loading}
          fallback={
            <div className="flex min-h-100 items-center justify-center w-full col-span-3">
              <span className="animate-pulse">Loading...</span>
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
