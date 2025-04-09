import { Button } from '@/components/ui/button';
import { cn } from '@/lib/utils';
import { CsvDropZone } from '@/modules/data-analysis/components/csv-drop-zone/csv-drop-zone';
import { CirclePause, HardDriveDownload, LoaderCircleIcon } from 'lucide-react';
import { Dashboard } from './features/dashboard/dashboard';
import { useCsvFileHandler } from './hooks/useCsvFileHandler';
import { DotIndicator } from '@/components/dot-indicator/dot-indicator';

export const DataAnalysis = () => {
  const { csv, cacheFile, retrieveFile } = useCsvFileHandler();
  const fetching = false;
  return (
    <>
      <div className='flex w-full justify-start content-center px-2 pb-4 gap-8'>
        <Button
          variant={fetching ? 'destructive' : 'default'}
          size='default'
          className={cn('flex items-center gap-2', fetching && 'opacity-75')}
        >
          Download
          {fetching ? <LoaderCircleIcon className='h-4 w-4 animate-spin' /> : <HardDriveDownload className='h-4 w-4' />}
        </Button>
        <Button
          variant={fetching ? 'destructive' : 'outline'}
          size='default'
          className={cn('flex items-center gap-2 relative', fetching && 'animate-pulse')}
        >
          Generate data<DotIndicator active={!fetching} animate />
          {fetching && <CirclePause className='h-4 w-4' />}
        </Button>
      </div>

      {csv ? (
        <div className='w-full'>
          <Dashboard data={csv} />
        </div>
      ) : (
        <CsvDropZone onDrop={cacheFile} />
      )}
    </>
  );
};
