import { Card, CardTitle } from '@/components/ui/card';
import { COLORS, getGoalCardColor } from '@/lib/colors';
import { cn } from '@/lib/utils';
import { useGoalResult } from '@/store';
import { useTranslation } from 'react-i18next';

export const GoalCard: React.FC = () => {
  const { t } = useTranslation();
  const { expense, expenseDone, income, incomeDone, investment, investmentDone, result } = useGoalResult();

  const { background } = COLORS[getGoalCardColor(result)];

  return (
    <Card className={'sm:col-span-2'}>
      <div className={cn('flex justify-center items-center text-center w-full h-11 border', background)}>
        <CardTitle className="text-base" data-testid="goal_card:result" aria-label={result}>
          {t(`goalCard.${result}`)}
        </CardTitle>
      </div>
      <div className="flex flex-col justify-between gap-3 py-3">
        <div className="flex justify-evenly w-full">
          <span data-testid="goal_card:income" className={cn('font-semibold', COLORS.green.text)}>
            {t('percentage', { value: income })}
          </span>
          <span data-testid="goal_card:expense" className={cn('font-semibold', COLORS.red.text)}>
            {t('percentage', { value: expense })}
          </span>
          <span data-testid="goal_card:investment" className={cn('font-semibold', COLORS.yellow.text)}>
            {t('percentage', { value: investment })}
          </span>
        </div>
        <hr />
        <div className="flex justify-evenly w-full">
          <span data-testid="goal_card:income_done" className={cn('font-semibold', COLORS.green.text)}>
            {t('percentage', { value: incomeDone })}
          </span>
          <span data-testid="goal_card:income_done" className={cn('font-semibold', COLORS.red.text)}>
            {t('percentage', { value: expenseDone })}
          </span>
          <span data-testid="goal_card:income_done" className={cn('font-semibold', COLORS.yellow.text)}>
            {t('percentage', { value: investmentDone })}
          </span>
        </div>
      </div>
    </Card>
  );
};
