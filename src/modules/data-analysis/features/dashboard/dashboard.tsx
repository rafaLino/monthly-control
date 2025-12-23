import { CsvDropZone } from '@/components/csv-drop-zone/csv-drop-zone';
import { resolveCsv } from '@/lib/resolve-csv';
import { cn } from '@/lib/utils';
import { useLocalParams } from '@/store';
import { QueryKeys } from '@/types/queryKeys';
import { useQueryClient } from '@tanstack/react-query';
import { FC } from 'react';
import { SwapContainer } from '../../components/swap-container/swap-container';
import { Metadata } from '../../types/metadata';
import { generateMetadata } from '../../utils/generate-metadata';
import { gridOptionsMap } from '../../utils/grid-config';
import { DashboardBarCharts } from './components/dashboard-bar-charts';
import { DashboardSkeleton } from './components/dashboard-skeleton';

type Props = {
  data?: Metadata[];
  loading?: boolean;
};

export const Dashboard: FC<Props> = ({ data, loading }) => {
  const queryClient = useQueryClient();
  const [gridCol] = useLocalParams<number>('grid_col');

  const handleDrop = async (file: File | undefined) => {
    if (!file) return;
    const csv = await resolveCsv(file);
    const metadata = generateMetadata(csv);
    queryClient.setQueryData([QueryKeys.generateMetadata], { metadata, csv });
  };

  if (loading) return <DashboardSkeleton />;

  return data ? (
    <SwapContainer
      data={data}
      swapyKey="type"
      className={cn('grid grid-cols-1 w-full gap-3 bg-gray-100 dark:bg-gray-700 sm:p-4 rounded-md', gridOptionsMap[gridCol - 1])}
    >
      {(item) => <DashboardBarCharts {...item} />}
    </SwapContainer>
  ) : (
    <div className="w-4/5">
      <CsvDropZone onDrop={handleDrop} />
    </div>
  );
};
