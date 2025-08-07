import { Input } from '@/components/ui/input';
import { sum } from '@/lib/utils';
import { ProjectionTable } from '@/modules/planner/features/projection-dialog/components/projection-table';
import { getAll } from '@/store';
import { RegisterType } from '@/types/register.types';
import { useMemo, useReducer, useRef } from 'react';
import { useTranslation } from 'react-i18next';
import { useFilterInput } from '../hooks/useFilterInput';
import { reducer } from '../utils/projection-reducer';
import { ProjectionResultCard } from './projection-result-card';
import { useKeyDown } from '@/hooks/useKeyDown';

export const ProjectionContent = () => {
  const { t } = useTranslation('translation', { keyPrefix: 'projectionDialog' });
  const [state, dispatch] = useReducer(reducer, getAll(), getAll);
  const inputRef = useRef<HTMLInputElement>(null);
  const [data, filterValue, onFilter] = useFilterInput(state);

  useKeyDown('Escape', () => {
    inputRef.current?.focus();
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

  return (
    <>
      <div className="flex flex-row items-center flex-wrap justify-evenly gap-1 w-full sm:w-1/2 sm:justify-self-center mt-8 sm:m-0">
        <ProjectionResultCard value={incomes} variant="success" />
        <p className="font-medium">-</p>
        <ProjectionResultCard value={costs} variant="warning" />
        <p className="font-medium">=</p>
        <ProjectionResultCard value={result} error={result < 0} />
      </div>
      <div className="flex items-center sm:justify-self-center sm:w-1/3 ">
        <Input ref={inputRef} tabIndex={-1} placeholder={t('search')} value={filterValue} onChange={onFilter} />
      </div>
      <section className="flex flex-col sm:flex-row items-start justify-between gap-2">
        <ProjectionTable key="incomes" records={data.incomes} type="incomes" onCheck={handleCheck} />
        <ProjectionTable key="expenses" records={data.expenses} type="expenses" onCheck={handleCheck} />
        <ProjectionTable key="investments" records={data.investments} type="investments" onCheck={handleCheck} />
      </section>
    </>
  );
};
