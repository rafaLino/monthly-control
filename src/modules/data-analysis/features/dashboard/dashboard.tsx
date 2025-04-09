import { FC, useState } from 'react';
import { SwapContainer } from '../../components/swap-container/swap-container';
import { generateMetadata } from '../../utils/generate-metadata';
import { DashboardBarCharts } from './components/dashboard-bar-charts';
import { Metadata } from '../../types/metadata';

type Props = {
  data: string;
};

export const Dashboard: FC<Props> = ({ data }) => {
  const [metadatas] = useState<Metadata[]>(generateMetadata(data));

  return (
    <SwapContainer data={metadatas} swapyKey='type' className='grid grid-cols-2 w-full gap-2 bg-gray-100 p-4 rounded-md'>
      {(item) => <DashboardBarCharts {...item} />}
    </SwapContainer>
  );
};
