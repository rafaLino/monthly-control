import { cn } from '@/lib/utils';
import { MoveRight } from 'lucide-react';
import { memo } from 'react';
import { useTranslation } from 'react-i18next';

const NOW = new Date();
const DEFAULT_CLOSING_DAY = 25;

const isAfterClosingDay = NOW.getDate() > DEFAULT_CLOSING_DAY;
const nextMonth = isAfterClosingDay && new Date(NOW).setMonth(NOW.getMonth() + 1);

export const ReferenceDate = memo(() => {
  const { t } = useTranslation();
  return (
    <div className="flex justify-center w-full sm:gap-1">
      <h1 className={cn('sm:text-2xl font-semibold whitespace-nowrap text-zinc-600', isAfterClosingDay && 'opacity-60')}>
        <span className="hidden sm:block">{t('date', { date: NOW })}</span>
        <span className="block sm:hidden">
          {t('date', { date: NOW, context: { format: isAfterClosingDay ? 'MMM' : 'MMMM' } })}
        </span>
      </h1>
      {isAfterClosingDay && (
        <div className="flex items-center">
          <MoveRight className="h-4 w-4 mx-2" />
          <h1 className="sm:text-2xl font-semibold whitespace-nowrap text-red-500">
            <span className="hidden sm:block">{t('date', { date: nextMonth })}</span>
            <span className="block sm:hidden">{t('date', { date: nextMonth, context: { format: 'MMM' } })}</span>
          </h1>
        </div>
      )}
    </div>
  );
});
