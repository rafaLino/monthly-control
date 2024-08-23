import { cn, formatCurrency } from '@/lib/utils';
import { Card, CardDescription, CardHeader, CardTitle } from '../ui/card';
import { COLORS, ColorType } from '@/lib/colors';

type SummarizedCardProps = {
  planned: number | undefined;
  realized: number | undefined;
  color: ColorType;
};

export const SummarizedCard: React.FC<SummarizedCardProps> = ({ realized, planned, color }) => {
  return (
    <Card className={cn('sm:col-span-1 border', COLORS[color].border, COLORS[color].background)}>
      <div className={'flex justify-around items-center h-full'}>
        <CardHeader className='flex flex-col gap-2'>
          <CardDescription className='font-semibold'>Planned:</CardDescription>
          <CardTitle className='text-base'>{formatCurrency(planned)}</CardTitle>
        </CardHeader>
        <CardHeader className='flex flex-col gap-2'>
          <CardDescription className='font-semibold'>Done:</CardDescription>
          <CardTitle className='text-base'>{formatCurrency(realized)}</CardTitle>
        </CardHeader>
      </div>
    </Card>
  );
};
