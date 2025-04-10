import { FC } from 'react';
import { SwapContainer } from '../../components/swap-container/swap-container';
import { Metadata } from '../../types/metadata';
import { DashboardBarCharts } from './components/dashboard-bar-charts';
import { DashboardSkeleton } from './components/dashboard-skeleton';
import { CsvDropZone } from '../../components/csv-drop-zone/csv-drop-zone';
import { useQueryClient } from '@tanstack/react-query';
import { resolveCsv } from '../../utils/resolve-csv';
import { generateMetadata } from '../../utils/generate-metadata';
import { QueryKeys } from '@/types/queryKeys';

type Props = {
  data?: Metadata[];
  loading?: boolean;
};

export const Dashboard: FC<Props> = ({ data, loading }) => {
  const queryClient = useQueryClient();

  const handleDrop = async (file: File | undefined) => {
    if (!file) return;
    const csv = await resolveCsv(file);
    const metadata = generateMetadata(csv);
    queryClient.setQueryData([QueryKeys.generateMetadata], { metadata, csv });
  };

  if (loading) return <DashboardSkeleton />;

  return data ? (
    <div className='w-full'>
      <SwapContainer data={data} swapyKey='type' className='grid grid-cols-2 w-full gap-2 bg-gray-100 p-4 rounded-md'>
        {(item) => <DashboardBarCharts {...item} />}
      </SwapContainer>
    </div>
  ) : (
    <CsvDropZone onDrop={handleDrop} />
  );
};
