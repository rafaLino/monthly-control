import { getAll } from '@/store';
import { useCallback, useState } from 'react';
import { Column } from '../utils/types';
import { useTranslation } from 'react-i18next';
import { TFunction } from 'i18next';
import { getBoardSnapshot } from '../utils/board-snapshot';

const NO_GROUP_ID = 'nogroup';

const descending = (a: Column, b: Column) => b.value - a.value;
const getInitialCols = (t: TFunction) => [{ id: NO_GROUP_ID, name: t('notGrouped'), value: 0 }];

const getColumns = (t: TFunction) => {
  const { incomes } = getAll();
  const snapshot = getBoardSnapshot();

  if (snapshot) {
    return snapshot.columns;
  }

  return getInitialCols(t).concat(
    incomes.toSorted(descending).map((item) => ({
      id: item.id,
      name: item.name,
      value: item.value
    })))
}

export function useBoardColumns() {
  const { t } = useTranslation('translation', { keyPrefix: 'projectionDialog' });

  const [columns, setColumns] = useState<Column[]>(() => getColumns(t));

  const isNoGroupColumn = (columnId: string) => columnId === NO_GROUP_ID;

  const mergeGroups = useCallback((target: string, source: string) => {
    setColumns((prevColumns) => {
      const fromColumn = prevColumns.find((col) => col.id === source);
      if (!fromColumn) return prevColumns;

      return prevColumns
        .map((col) =>
          col.id === target
            ? {
              ...col,
              name: `${col.name} + ${fromColumn.name}`,
              value: (col.value ?? 0) + (fromColumn.value ?? 0)
            }
            : col
        )
        .filter((col) => col.id !== fromColumn.id);
    });
  }, []);

  return {
    columns,
    setColumns,
    isNoGroupColumn,
    mergeGroups
  };
}
