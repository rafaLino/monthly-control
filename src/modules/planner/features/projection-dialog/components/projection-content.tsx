import { Button } from '@/components/ui/button';
import { Input } from '@/components/ui/input';
import { useKeyDown } from '@/hooks/useKeyDown';
import { sum } from '@/lib/utils';
import { ProjectionTable } from '@/modules/planner/features/projection-dialog/components/projection-table';
import { getAll } from '@/store';
import { RegisterType } from '@/types/register.types';
import { useMemo, useReducer } from 'react';
import { useTranslation } from 'react-i18next';
import { useFilterInput } from '../hooks/useFilterInput';
import { reducer } from '../utils/projection-reducer';
import { ProjectionResultCard } from './projection-result-card';

export const ProjectionContent = () => {
  const { t } = useTranslation('translation', { keyPrefix: 'projectionDialog' });
  const [state, dispatch] = useReducer(reducer, getAll(), getAll);
  const [data, filterValue, onFilter] = useFilterInput(state);

  useKeyDown('Escape', () => {
    dispatch({ action: 'clear' });
  });

  const incomes = useMemo(() => sum(state.incomes.filter((i) => i.checked)), [state.incomes]);

  const costs = useMemo(
    () => sum(state.expenses.filter((i) => i.checked)) + sum(state.investments.filter((i) => i.checked)),
    [state.expenses, state.investments]
  );

  const result = incomes - costs;

  const handleCheck = (id: string, type: RegisterType) => {
    dispatch({ id, type });
  };

  const handleClear = () => {
    dispatch({ action: 'clear' });
  };

  return (
    <>
      <div className="flex flex-row flex-wrap items-center justify-evenly gap-1 w-full sm:w-1/2 sm:justify-self-center mt-8 sm:m-0">
        <ProjectionResultCard value={incomes} variant="success" />
        <p className="font-medium">-</p>
        <ProjectionResultCard value={costs} variant="warning" />
        <p className="font-medium">=</p>
        <ProjectionResultCard value={result} error={result < 0} />
      </div>
      <div className="flex items-center justify-between gap-1 sm:gap-2">
        <Button tabIndex={-1} variant="secondary" className="border hover:bg-gray-200" onClick={handleClear}>
          {t('clear')}
        </Button>
        <div className="flex items-center w-full sm:w-2/4">
          <Input tabIndex={-1} placeholder={t('search')} value={filterValue} onChange={onFilter} />
        </div>
        <div />
      </div>
      <section className="flex flex-col sm:flex-row items-start justify-between gap-2">
        <ProjectionTable key="incomes" records={data.incomes} type="incomes" onCheck={handleCheck} />
        <ProjectionTable key="expenses" records={data.expenses} type="expenses" onCheck={handleCheck} />
        <ProjectionTable key="investments" records={data.investments} type="investments" onCheck={handleCheck} />
      </section>
    </>
  );
};
