import { useQuery } from '@tanstack/react-query';
import { DownloadButton } from './components/download-button/download-button';
import { Dashboard } from './features/dashboard/dashboard';
import { GenerateDataButton } from './features/generate-data-button/generate-data-button';
import { downloadMetadata } from './utils/data-analysis.service';

export const DataAnalysis = () => {
  const { data, isLoading, isRefetching, refetch } = useQuery({
    queryKey: ['dowloadCsv'],
    queryFn: async ({ signal }) => downloadMetadata(signal),
  });

  return (
    <>
      <div className='flex w-4/5 justify-end content-center px-2 pb-4 gap-8'>
        <DownloadButton fetching={isRefetching} onClick={refetch} />
        <GenerateDataButton />
      </div>

      <Dashboard loading={isLoading} data={data} />
    </>
  );
};
