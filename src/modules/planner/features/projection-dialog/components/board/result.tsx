import { FC } from 'react';
import { useTranslation } from 'react-i18next';
import { ResultItem } from './result-item';

type ResultProps = {
  column: { id: string; value: number };
  totals: Record<string, number>;
};
export const Result: FC<ResultProps> = ({ column, totals }) => {
  const { t } = useTranslation('translation', { keyPrefix: 'projectionDialog' });
  const value = totals[column.id];
  const diff = column.value - value;

  const display = value > 0;

  return (
    display && (
      <div className="flex flex-col gap-2">
        <ResultItem label={t('balance')} value={diff} variant={diff < 0 ? 'warning' : 'success'} />
        <ResultItem label={t('sum')} value={value} variant="info" />
      </div>
    )
  );
};
