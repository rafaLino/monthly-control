import { Input } from '@/components/ui/input';
import { sum } from '@/lib/utils';
import { ProjectionTable } from '@/modules/planner/features/projection-dialog/components/projection-table';
import { getAll } from '@/store';
import { RegisterType } from '@/types/register.types';
import { useMemo, useReducer } from 'react';
import { useTranslation } from 'react-i18next';
import { useSearchInput } from '../hooks/useSearchInput';
import { reducer } from '../utils/projection-reducer';
import { ProjectionResultCard } from './projection-result-card';

export const ProjectionContent = () => {
  const { t } = useTranslation('translation', { keyPrefix: 'projectionDialog' });
  const [state, dispatch] = useReducer(reducer, getAll(), getAll);
  const [data, { searchValue, onSearch }] = useSearchInput(state);

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
      <div className="flex flex-row items-center justify-evenly w-1/2 justify-self-center">
        <ProjectionResultCard value={incomes} variant="success" />
        <p className="font-medium">-</p>
        <ProjectionResultCard value={costs} variant="warning" />
        <p className="font-medium">=</p>
        <ProjectionResultCard value={result} error={result < 0} />
      </div>
      <div className="flex items-center justify-self-center w-1/3 ">
        <Input tabIndex={-1} placeholder={t('search')} value={searchValue} onChange={onSearch} />
      </div>
      <section className="flex flex-row items-start justify-between gap-2 ">
        <ProjectionTable key="incomes" records={data.incomes} type="incomes" onCheck={handleCheck} />
        <ProjectionTable key="expenses" records={data.expenses} type="expenses" onCheck={handleCheck} />
        <ProjectionTable key="investments" records={data.investments} type="investments" onCheck={handleCheck} />
      </section>
    </>
  );
};
