import { COLORS, ColorType } from '@/lib/colors';
import { cn } from '@/lib/utils';
import { Card, CardDescription, CardHeader, CardTitle } from '../ui/card';

type SummarizedCardProps = {
  planned: string;
  realized: string;
  color: ColorType;
  plannedLabel: string | undefined;
  doneLabel: string | undefined;
};

export const SummarizedCard: React.FC<SummarizedCardProps> = ({ realized, planned, color, plannedLabel, doneLabel }) => {
  return (
    <Card className={cn('sm:col-span-1 border', COLORS[color].border, COLORS[color].background)}>
      <div className={'flex justify-evenly items-center h-full'}>
        <CardHeader className="flex flex-col gap-2">
          <CardDescription className="font-semibold">{plannedLabel}</CardDescription>
          <CardTitle className="text-base">{planned}</CardTitle>
        </CardHeader>
        <CardHeader className="flex flex-col gap-2">
          <CardDescription className="font-semibold">{doneLabel}</CardDescription>
          <CardTitle className="text-base">{realized}</CardTitle>
        </CardHeader>
      </div>
    </Card>
  );
};
