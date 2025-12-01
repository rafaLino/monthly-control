import { getAll } from '@/store';
import { useCallback, useState } from 'react';
import { Column } from '../utils/types';

const NO_GROUP_ID = 'nogroup';
const INITIAL_COLS = [{ id: NO_GROUP_ID, name: 'Not Grouped', value: 0 }];

const descending = (a: Column, b: Column) => b.value - a.value;

export function useBoardColumns() {
  const [columns, setColumns] = useState<Column[]>(() => {
    const { incomes } = getAll();
    return INITIAL_COLS.concat(
      incomes.toSorted(descending).map((item) => ({
        id: item.id,
        name: item.name,
        value: item.value
      }))
    );
  });

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
