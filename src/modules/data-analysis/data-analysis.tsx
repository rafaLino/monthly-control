import { CheckBoxWithLabel } from '@/components/checkbox-label/checkbox-label';
import { useLocalParams } from '@/store';
import { QueryKeys } from '@/types/queryKeys';
import { CheckedState } from '@radix-ui/react-checkbox';
import { useQuery, useQueryClient } from '@tanstack/react-query';
import { ClearDataButton } from './components/clear-data-button/clear-data-button';
import { DownloadButton } from './components/download-button/download-button';
import { GridButton } from './components/grid-button/grid-button';
import { Dashboard } from './features/dashboard/dashboard';
import { GenerateDataButton } from './features/generate-data-button/generate-data-button';
import { downloadMetadata } from './utils/data-analysis.logic';
import { saveFile } from './utils/save-file';
import { useTranslation } from 'react-i18next';

export const DataAnalysis = () => {
  const { t } = useTranslation('translation', { keyPrefix: 'dashboard' });
  const [disableAutoDownload, setLocalParam] = useLocalParams<boolean>('disable_automatic_download');
  const queryClient = useQueryClient();
  const { data, isLoading, isRefetching, refetch, isSuccess } = useQuery({
    queryKey: [QueryKeys.generateMetadata],
    queryFn: async ({ signal }) => downloadMetadata(signal),
    enabled: !disableAutoDownload,
  });

  const handleSaveFile = () => {
    if (!data) return;
    saveFile(data.csv);
  };

  const handleDisableAutoDownload = (checked: CheckedState) => {
    setLocalParam('disable_automatic_download', checked === true);
  };

  const handleClearData = () => {
    queryClient.setQueryData([QueryKeys.generateMetadata], null);
  };

  return (
    <>
      <div className='flex w-full px-16 justify-between'>
        <div className='flex items-center'>
          <CheckBoxWithLabel
            label={t('disableAutoDownload')}
            checked={disableAutoDownload}
            onCheckedChange={handleDisableAutoDownload}
          />
          <GridButton title={t('gridLayout')} />
        </div>
        <div className='flex items-center gap-8 pb-4'>
          <DownloadButton isSuccess={isSuccess} fetching={isRefetching} onClick={refetch} onSaveFile={handleSaveFile} />
          <GenerateDataButton />
          <ClearDataButton onClick={handleClearData} helperText={t('clearData')} />
        </div>
      </div>
      <div className='flex items-center justify-end w-full space-x-2'></div>

      <Dashboard loading={isLoading} data={data?.metadata} />
    </>
  );
};
