import { useQuery } from '@tanstack/react-query';
import { DownloadButton } from './components/download-button/download-button';
import { Dashboard } from './features/dashboard/dashboard';
import { GenerateDataButton } from './features/generate-data-button/generate-data-button';
import { downloadMetadata } from './utils/data-analysis.service';
import { Button } from '@/components/ui/button';
import { FileDown } from 'lucide-react';
import { QueryKeys } from '@/types/queryKeys';
import { downloadFile } from './utils/download-file';

export const DataAnalysis = () => {
  const { data, isLoading, isRefetching, refetch, isSuccess } = useQuery({
    queryKey: [QueryKeys.generateMetadata],
    queryFn: async ({ signal }) => downloadMetadata(signal),
  });

  const handleSaveFile = async () => {
    if (!data) return;
    downloadFile('result.csv', data.csv);
  };

  return (
    <>
      <div className='flex w-4/5 justify-end content-center px-2 pb-4 gap-8'>
        <div>
          <DownloadButton fetching={isRefetching} onClick={refetch} />
          {isSuccess && (
            <Button variant='outline' size='icon' onClick={handleSaveFile}>
              <FileDown className='h-4 w-4' />
            </Button>
          )}
        </div>

        <GenerateDataButton />
      </div>

      <Dashboard loading={isLoading} data={data?.metadata} />
    </>
  );
};
