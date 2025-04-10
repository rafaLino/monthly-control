import { Checkbox } from '@/components/ui/checkbox';
import { useLocalParams } from '@/store';
import { QueryKeys } from '@/types/queryKeys';
import { CheckedState } from '@radix-ui/react-checkbox';
import { useQuery } from '@tanstack/react-query';
import { DownloadButton } from './components/download-button/download-button';
import { GridButton } from './components/grid-button/grid-button';
import { Dashboard } from './features/dashboard/dashboard';
import { GenerateDataButton } from './features/generate-data-button/generate-data-button';
import { downloadMetadata } from './utils/data-analysis.logic';
import { saveFile } from './utils/save-file';

export const DataAnalysis = () => {
  const [disableAutoDownload, setLocalParam] = useLocalParams<boolean>('disable_automatic_download');

  const { data, isLoading, isRefetching, refetch, isSuccess } = useQuery({
    queryKey: [QueryKeys.generateMetadata],
    queryFn: async ({ signal }) => downloadMetadata(signal),
    enabled: !disableAutoDownload
  });

  const handleSaveFile = async () => {
    if (!data) return;
    saveFile('result.csv', data.csv);
  };

  const handleDisableAutoDownload = (checked: CheckedState) => {
    setLocalParam('disable_automatic_download', checked === true);
  };

  return (
    <>
      <div className="flex w-full px-16 justify-between">
        <div className="flex items-center space-x-2">
          <label
            htmlFor="disableAutoDownload"
            className="text-sm font-medium leading-none peer-disabled:cursor-not-allowed peer-disabled:opacity-70"
          >
            Disable automatic download
          </label>
          <Checkbox id="disableAutoDownload" checked={disableAutoDownload} onCheckedChange={handleDisableAutoDownload} />
          <GridButton />
        </div>
        <div className="flex items-center gap-8 pb-4">
          <DownloadButton isSuccess={isSuccess} fetching={isRefetching} onClick={refetch} onSaveFile={handleSaveFile} />
          <GenerateDataButton />
        </div>
      </div>
      <div className="flex items-center justify-end w-full space-x-2"></div>

      <Dashboard loading={isLoading} data={data?.metadata} />
    </>
  );
};
