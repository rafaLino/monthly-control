import { getReferenceDate } from '@/lib/get-reference-date';
import { cn } from '@/lib/utils';
import { MoveRight } from 'lucide-react';
import { memo } from 'react';
import { useTranslation } from 'react-i18next';

const referenceDate = getReferenceDate();

export const ReferenceDate = memo(() => {
  const { t } = useTranslation();
  return (
    <div className="flex justify-center w-full sm:gap-1">
      <h1 className={cn('sm:text-2xl font-semibold whitespace-nowrap text-zinc-600', referenceDate.hasNext && 'opacity-60')}>
        <span className="hidden sm:block">{t('date', { date: referenceDate.now })}</span>
        <span className="block sm:hidden">
          {t('date', { date: referenceDate.now, context: { format: referenceDate.hasNext ? 'MMM' : 'MMMM' } })}
        </span>
      </h1>
      {referenceDate.hasNext && (
        <div className="flex items-center">
          <MoveRight className="h-4 w-4 mx-2" />
          <h1 className="sm:text-2xl font-semibold whitespace-nowrap text-red-500">
            <span className="hidden sm:block">{t('date', { date: referenceDate.next })}</span>
            <span className="block sm:hidden">{t('date', { date: referenceDate.next, context: { format: 'MMM' } })}</span>
          </h1>
        </div>
      )}
    </div>
  );
});
