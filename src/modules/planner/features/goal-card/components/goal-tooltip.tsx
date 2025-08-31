import { Tooltip, TooltipContent, TooltipProvider, TooltipTrigger } from '@/components/ui/tooltip';
import { cn } from '@/lib/utils';
import { Check, TrendingDown, TrendingUp } from 'lucide-react';
import { FC, PropsWithChildren } from 'react';
import { useTranslation } from 'react-i18next';

type GoalTooltipProps = PropsWithChildren<{
  goal: number;
  value: number;
}>;
export const GoalTooltip: FC<GoalTooltipProps> = ({ value, goal: goal, children }) => {
  return (
    <TooltipProvider>
      <Tooltip>
        <TooltipTrigger asChild>{children}</TooltipTrigger>
        <ItemContent goal={goal} value={value} />
      </Tooltip>
    </TooltipProvider>
  );
};

const ItemContent: FC<{ value: number; goal: number }> = ({ value, goal }) => {
  const { t } = useTranslation();
  const showContent = value > 0 || goal > 0;
  const result = checkValues(value, goal);
  const difference = Math.abs(goal - value);
  return (
    <TooltipContent>
      <div className="flex flex-row items-center gap-1">
        {showContent && (
          <div className="flex flex-col leading-none">
            {difference > 0 && (
              <span
                className={cn(
                  'font-semibold text-[8px] leading-none',
                  result === 'increase' ? 'text-orange-400' : 'text-orange-400'
                )}
              >
                {t('percentage', { value: difference })}
              </span>
            )}
            <IconContent content={result} />
          </div>
        )}
        <span className="font-semibold text-blue-400">{t('percentage', { value: goal })}</span>
      </div>
    </TooltipContent>
  );
};

const checkValues = (value: number, goal: number) => {
  if (goal === value) return 'equal';
  if (goal > value) return 'increase';

  return 'decrease';
};

const IconContent: FC<{ content: 'equal' | 'increase' | 'decrease' }> = ({ content }) => {
  switch (content) {
    case 'equal':
      return <Check className="h-3 w-3 text-green-400" />;
    case 'increase':
      return <TrendingUp className="h-3 w-3 text-orange-400" />;
    case 'decrease':
      return <TrendingDown className="h-3 w-3 text-orange-400" />;
  }
};
