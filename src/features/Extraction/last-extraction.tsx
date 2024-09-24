import { Button } from '@/components/ui/button';
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card';
import { cn } from '@/lib/utils';
import { useLastExtraction } from '@/store/store';
import { CirclePause, HardDriveDownload, LoaderCircle } from 'lucide-react';
import { useTranslation } from 'react-i18next';
import { useExtractionLogic } from './hooks/useExtractionLogic';

/**
 * https://date-fns.org/v4.1.0/docs/format
 * e.g: 24 de setembro de 2024 às 01:40:37am
 */
const DATE_FORMAT = 'PPPppaaa';

export const LastExtraction = () => {
  const { t } = useTranslation();
  const lastLog = useLastExtraction();
  const { fetching, extract, cancel } = useExtractionLogic();

  const handleClick = () => {
    const action = fetching ? cancel : extract;
    action();
  };

  return (
    <Card x-chunk="last_extraction" className="grid grid-cols-2 w-96 w-full">
      <CardHeader className="flex flex-col justify-between space-y-0 pb-2 p-4">
        <CardTitle className="text-sm font-medium flex flex-row items-center gap-2">
          {t('logs.lastExtraction')}
          {fetching && <LoaderCircle className="h-4 w-4 animate-spin" />}
        </CardTitle>
        <p className="text-xs text-muted-foreground whitespace-nowrap">
          {lastLog ? t('date', { date: lastLog.createdAt, context: { format: DATE_FORMAT } }) : '--'}
        </p>
      </CardHeader>
      <CardContent className="flex items-center justify-end p-2 relative">
        <Button variant={cn(fetching ? 'destructive' : 'default') as never} size="sm" onClick={handleClick}>
          {fetching ? <CirclePause className="h-4 w-4" /> : <HardDriveDownload className="h-4 w-4" />}
        </Button>
      </CardContent>
    </Card>
  );
};
