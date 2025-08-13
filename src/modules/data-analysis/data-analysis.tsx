import { CheckBoxWithLabel } from '@/components/checkbox-label/checkbox-label';
import env from '@/lib/env';
import { useLocalParams } from '@/store';
import { QueryKeys } from '@/types/queryKeys';
import { CheckedState } from '@radix-ui/react-checkbox';
import { useQuery, useQueryClient } from '@tanstack/react-query';
import { useTranslation } from 'react-i18next';
import { ClearDataButton } from './components/clear-data-button/clear-data-button';
import { DownloadButton } from './components/download-button/download-button';
import { GridButton } from './components/grid-button/grid-button';
import { Assistant } from './features/assistant/assistant';
import { Dashboard } from './features/dashboard/dashboard';
import { GenerateDataButton } from './features/generate-data-button/generate-data-button';
import { downloadMetadata } from './utils/data-analysis.logic';
import { saveFile } from './utils/save-file';

export const DataAnalysis = () => {
  const { t } = useTranslation('translation', { keyPrefix: 'dashboard' });
  const [disableAutoDownload, setLocalParam] = useLocalParams<boolean>('disable_automatic_download');
  const queryClient = useQueryClient();
  const { data, isLoading, isRefetching, refetch, isSuccess } = useQuery({
    queryKey: [QueryKeys.generateMetadata],
    queryFn: async ({ signal }) => downloadMetadata(signal),
    enabled: !disableAutoDownload
  });

  const handleSaveFile = () => {
    if (!data) return;
    saveFile(data.csv);
  };

  const handleDisableAutoDownload = (checked: CheckedState) => {
    setLocalParam('disable_automatic_download', checked === true);
  };

  const handleClearData = () => {
    if (!data) return;
    queryClient.setQueryData([QueryKeys.generateMetadata], null);
  };

  return (
    <>
      <Assistant />
      <div className="flex flex-col sm:flex-row gap-2 w-full px-0 sm:px-16 sm:justify-between">
        <div className="flex w-full justify-between sm:justify-start items-center gap-2">
          <CheckBoxWithLabel
            label={t('disableAutoDownload')}
            checked={disableAutoDownload}
            onCheckedChange={handleDisableAutoDownload}
            disabled={!env.VITE_ONLINE}
          />
          <GridButton title={t('gridLayout')} />
        </div>
        <div className="flex flex-row justify-end sm:items-center gap-2 sm:gap-4 pb-4">
          <div className="flex-1">
            <DownloadButton isSuccess={isSuccess} fetching={isRefetching} onClick={refetch} onSaveFile={handleSaveFile} />
          </div>
          <GenerateDataButton />
          <ClearDataButton onClick={handleClearData} helperText={t('clearData')} />
        </div>
      </div>

      <Dashboard loading={isLoading} data={data?.metadata} />
    </>
  );
};
