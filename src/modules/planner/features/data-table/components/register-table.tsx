import { Table, TableBody, TableCell, TableHead, TableHeader, TableRow } from '@/components/ui/table';
import { DataTableFilterContext } from '@/context/DataTableFilterContext';
import { MediaQueries, useMediaQuery } from '@/hooks/useMediaQuery';
import { cn } from '@/lib/utils';
import { SetRegistersActionType } from '@/store/global.state';
import { Register } from '@/types/register.types';
import {
  ColumnDef,
  flexRender,
  getCoreRowModel,
  getFilteredRowModel,
  getPaginationRowModel,
  getSortedRowModel,
  useReactTable
} from '@tanstack/react-table';
import { useCallback, useContext, useMemo } from 'react';
import { useTranslation } from 'react-i18next';
import { useSkipper } from '../hooks/useSkipper';
import { CheckedCell } from './checked-cell';
import { CheckedHeaderCell } from './checked-header-cell';
import { DeleteCell } from './delete-cell';
import { MenuHeaderCell } from './menu-header-cell';
import { NameCell } from './name-cell';
import CustomPagination from './pagination';
import { PercentCell } from './percent-cell';
import { SortingButton } from './sorting-button';
import { ValueCell } from './value-cell';
import { AddInput } from '@/components/add-input';

type RegisterTableProps = {
  data: Array<Register>;
  onChange?: (action: SetRegistersActionType) => void;
  total: number;
};

export default function RegisterTable({ data, total, onChange }: Readonly<RegisterTableProps>) {
  const { t } = useTranslation('translation', { keyPrefix: 'registerTable' });
  const matches = useMediaQuery(MediaQueries.md);
  const filter = useContext(DataTableFilterContext);
  const columns = useMemo<ColumnDef<Register>[]>(
    () => [
      {
        header: CheckedHeaderCell,
        id: 'checked',
        accessorKey: 'checked',
        enableSorting: false,
        cell: CheckedCell
      },
      {
        header: t('name'),
        accessorKey: 'name',
        enableSorting: false,
        cell: NameCell
      },
      {
        header: t('value'),
        accessorKey: 'value',
        sortingFn: 'basic',
        enableSorting: true,
        cell: ValueCell
      },
      {
        header: '',
        id: 'percentage',
        accessorKey: 'value',
        cell: PercentCell,
        enableSorting: false
      },
      {
        header: MenuHeaderCell,
        id: 'actions',
        cell: DeleteCell,
        enableSorting: false
      }
    ],
    [t]
  );

  const [autoResetPageIndex, skipAutoResetPageIndex] = useSkipper();

  const updateData = useCallback(
    (index: number, columnId: string, value: unknown) => {
      skipAutoResetPageIndex();
      const newValue: Partial<Register> = {
        [columnId]: value
      };
      const id = data[index].id;
      onChange?.({ type: 'update', payload: { id, value: newValue } });
    },
    [data, onChange, skipAutoResetPageIndex]
  );

  const addData = useCallback(
    (name: string | undefined, value: number) => {
      if (!name) return;
      skipAutoResetPageIndex();
      onChange?.({ type: 'add', payload: { name, value } });
    },
    [onChange, skipAutoResetPageIndex]
  );

  const removeData = useCallback(
    (index: number) => {
      skipAutoResetPageIndex();
      const id = data[index].id;
      onChange?.({ type: 'remove', payload: { id } });
    },
    [data, onChange, skipAutoResetPageIndex]
  );

  const checkAllData = useCallback(
    (value: boolean | 'indeterminate') => {
      skipAutoResetPageIndex();
      onChange?.({ type: 'checkAll', payload: { value } });
    },
    [onChange, skipAutoResetPageIndex]
  );

  const table = useReactTable({
    data,
    columns,
    getCoreRowModel: getCoreRowModel(),
    getFilteredRowModel: getFilteredRowModel(),
    getPaginationRowModel: getPaginationRowModel(),
    getSortedRowModel: getSortedRowModel(),
    state: {
      columnVisibility: {
        percentage: matches
      },
      globalFilter: filter,
      total
    },
    initialState: {
      sorting: [
        {
          id: 'value',
          desc: true
        }
      ],
      pagination: {
        pageSize: 20
      }
    },
    autoResetPageIndex,
    meta: {
      updateData,
      removeData,
      checkAllData
    }
  });

  return (
    <div className="p-1">
      <div className="h-2" />
      <Table>
        <TableHeader>
          {table.getHeaderGroups().map((headerGroup) => (
            <TableRow key={headerGroup.id}>
              {headerGroup.headers.map((header) => {
                return (
                  <TableHead key={header.id} colSpan={header.colSpan} className={cn(header.index === 0 && 'p-0')}>
                    {header.isPlaceholder ? null : (
                      <div className="flex items-center pr-3 group">
                        {flexRender(header.column.columnDef.header, header.getContext())}
                        <SortingButton
                          canSort={header.column.getCanSort()}
                          isSorted={header.column.getIsSorted()}
                          toggle={header.column.getToggleSortingHandler()}
                        />
                      </div>
                    )}
                  </TableHead>
                );
              })}
            </TableRow>
          ))}
        </TableHeader>
        <TableBody>
          {table.getRowModel().rows.map((row) => {
            return (
              <TableRow key={row.id} data-testid={row.id}>
                {row.getVisibleCells().map((cell) => {
                  return (
                    <TableCell className="group text-center pr-3" key={cell.id} data-testid={cell.id}>
                      {flexRender(cell.column.columnDef.cell, cell.getContext())}
                    </TableCell>
                  );
                })}
              </TableRow>
            );
          })}
        </TableBody>
      </Table>
      <div className="flex py-2">
        <AddInput placeholder={t('addNewRegister')} type="text" className="placeholder:text-stone-300" onAdd={addData} />
      </div>
      <CustomPagination
        pageIndex={table.getState().pagination.pageIndex}
        pageCount={table.getPageCount()}
        canNextPage={table.getCanNextPage()}
        canPreviousPage={table.getCanPreviousPage()}
        goNext={table.nextPage}
        goPrevious={table.previousPage}
        onChangePage={table.setPageIndex}
        length={table.getRowCount()}
      />
    </div>
  );
}
