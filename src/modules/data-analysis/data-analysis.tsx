import { useQuery } from '@tanstack/react-query';
import { DownloadButton } from './components/download-button/download-button';
import { Dashboard } from './features/dashboard/dashboard';
import { GenerateDataButton } from './features/generate-data-button/generate-data-button';
import { downloadMetadata } from './utils/data-analysis.logic';
import { Button } from '@/components/ui/button';
import { FileDown } from 'lucide-react';
import { QueryKeys } from '@/types/queryKeys';
import { downloadFile } from './utils/download-file';
import { Checkbox } from '@/components/ui/checkbox';
import { CheckedState } from '@radix-ui/react-checkbox';
import { useLocalParams } from './hooks/useLocalParams';

export const DataAnalysis = () => {
  const [disableAutoDownload, setLocalParam] = useLocalParams<boolean>('disable_automatic_download');
  
  const { data, isLoading, isRefetching, refetch, isSuccess } = useQuery({
    queryKey: [QueryKeys.generateMetadata],
    queryFn: async ({ signal }) => downloadMetadata(signal),
    enabled: !disableAutoDownload,
  });

  const handleSaveFile = async () => {
    if (!data) return;
    downloadFile('result.csv', data.csv);
  };

  const handleDisableAutoDownload = (checked: CheckedState) => {
    setLocalParam('disable_automatic_download', checked === true);
  }

  return (
    <>
      <div className='flex w-full px-16 justify-between'>
        <div className='flex items-center space-x-2'>
          <label
            htmlFor='disableAutoDownload'
            className='text-sm font-medium leading-none peer-disabled:cursor-not-allowed peer-disabled:opacity-70'
          >
            Disable automatic download
          </label>
          <Checkbox
            id='disableAutoDownload'
            checked={disableAutoDownload}
            onCheckedChange={handleDisableAutoDownload}
          />
        </div>
        <div className='flex items-center gap-8 pb-4'>
          <div className='flex gap-1'>
            {isSuccess && (
              <Button variant='ghost' size='icon' onClick={handleSaveFile}>
                <FileDown className='h-4 w-4' />
              </Button>
            )}
            <DownloadButton fetching={isRefetching} onClick={refetch} />
          </div>
          <GenerateDataButton />
        </div>
      </div>

      <Dashboard loading={isLoading} data={data?.metadata} />
    </>
  );
};
