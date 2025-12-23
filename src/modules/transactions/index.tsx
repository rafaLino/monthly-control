import { CsvDropZone } from '@/components/csv-drop-zone/csv-drop-zone';
import { NavigationScrollArea } from '@/components/navigation-scroll-area';
import {
  Timeline,
  TimelineItem,
  TimelineItemDate,
  TimelineItemDescription,
  TimelineItemTitle
} from '@/components/ui/8star-labs/timeline';
import { CSVtoObject } from '@/lib/csv-to-object';
import { resolveCsv } from '@/lib/resolve-csv';
import { useState, useTransition } from 'react';
import { useTranslation } from 'react-i18next';
import { Summary } from './components/summary';
import type { Transaction } from './types/transaction';

export function TransactionModule() {
  const [items, setItems] = useState<Transaction[]>([]);
  const { t } = useTranslation('translation');
  const [isPending, startTransition] = useTransition();

  const handleDrop = (file: File | undefined) => {
    if (!file) return;
    startTransition(async () => {
      const csv = await resolveCsv(file);
      const data = CSVtoObject<Transaction>(csv);
      setItems(
        data.filter((item) => item.date && item.title && item.amount).map((item, index) => ({ ...item, id: String(index + 1) }))
      );
    });
  };

  if (isPending)
    return (
      <div className="flex max-h-lvh items-center justify-center">
        <span className="animate-pulse">Loading...</span>
      </div>
    );

  return (
    <>
      {items.length === 0 ? (
        <div className="w-4/5">
          <CsvDropZone onDrop={handleDrop} />
        </div>
      ) : (
        <div className="grid grid-flow-row grid-cols-1 sm:grid-cols-3 gap-2 justify-center">
          <Summary items={items} />
          <NavigationScrollArea type="scroll" className="h-145 sm:h-160 w-full rounded-md overflow-y-hidden col-span-3">
            <Timeline orientation="vertical" noCards vertItemSpacing={60}>
              {items.map((item) => (
                <TimelineItem key={item.id} variant="outline">
                  <TimelineItemDate>{t('date', { date: item.date, context: { format: 'dd/MM/yy' } })}</TimelineItemDate>
                  <TimelineItemTitle>{t('currency', { value: item.amount })}</TimelineItemTitle>
                  <TimelineItemDescription>{item.title}</TimelineItemDescription>
                </TimelineItem>
              ))}
            </Timeline>
          </NavigationScrollArea>
        </div>
      )}
    </>
  );
}
