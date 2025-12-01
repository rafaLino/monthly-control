import { FC } from 'react';
import { ResultItem } from './result-item';

type ResultProps = {
  show: boolean;
  column: { id: string; value: number };
  totals: Record<string, number>;
};
export const Result: FC<ResultProps> = ({ show, column, totals }) => {
  const value = totals[column.id];
  const diff = column.value - value;

  const display = show && value > 0;

  return (
    display && (
      <div className="flex flex-col gap-2">
        <ResultItem label="Saldo" value={diff} variant={diff < 0 ? 'warning' : 'success'} />
        <ResultItem label="Soma" value={value} variant="info" />
      </div>
    )
  );
};
