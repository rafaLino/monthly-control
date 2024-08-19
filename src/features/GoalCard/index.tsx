import { Card, CardTitle } from '@/components/ui/card';
import { COLORS, getGoalCardColor } from '@/lib/colors';
import { cn, getPercentage } from '@/lib/utils';
import { useGoalResult } from '@/store/store';

export const GoalCard: React.FC = () => {
  const { expense, expenseDone, income, incomeDone, investment, investmentDone, result } = useGoalResult();

  const { background } = COLORS[getGoalCardColor(result)];

  return (
    <Card className={'sm:col-span-2'}>
      <div className={cn('flex justify-center items-center text-center w-full h-11 border', background)}>
        <CardTitle className='text-base'>{result}</CardTitle>
      </div>
      <div className='flex flex-col justify-between gap-3 py-3'>
        <div className='flex justify-evenly w-full'>
          <span className={cn('font-semibold', COLORS.green.text)}>{getPercentage(income)}</span>
          <span className={cn('font-semibold', COLORS.red.text)}>{getPercentage(expense)}</span>
          <span className={cn('font-semibold', COLORS.yellow.text)}>{getPercentage(investment)}</span>
        </div>
        <hr />
        <div className='flex justify-evenly w-full'>
          <span className={cn('font-semibold', COLORS.green.text)}>{getPercentage(incomeDone)}</span>
          <span className={cn('font-semibold', COLORS.red.text)}>{getPercentage(expenseDone)}</span>
          <span className={cn('font-semibold', COLORS.yellow.text)}>{getPercentage(investmentDone)}</span>
        </div>
      </div>
    </Card>
  );
};
