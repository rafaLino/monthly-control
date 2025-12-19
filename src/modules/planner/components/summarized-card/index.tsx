import { Card, CardDescription, CardHeader, CardTitle } from '@/components/ui/card';
import { COLORS, ColorType } from '@/lib/colors';
import { cn } from '@/lib/utils';

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
        <CardHeader className="flex flex-col gap-4">
          <CardDescription className="font-semibold">{plannedLabel}</CardDescription>
          <CardTitle className="text-base" data-testid="planned_value">
            {planned}
          </CardTitle>
        </CardHeader>
        <CardHeader className="flex flex-col gap-4">
          <CardDescription className="font-semibold">{doneLabel}</CardDescription>
          <CardTitle className="text-base" data-testid="received_value">
            {realized}
          </CardTitle>
        </CardHeader>
      </div>
    </Card>
  );
};
