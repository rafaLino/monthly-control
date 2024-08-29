/* eslint-disable @typescript-eslint/no-unused-vars */
import { generateId } from '@/lib/utils';
import {
  CellContext,
  ColumnDef,
  flexRender,
  getCoreRowModel,
  getFilteredRowModel,
  getPaginationRowModel,
  HeaderContext,
  RowData,
  useReactTable,
} from '@tanstack/react-table';
import { useCallback, useMemo } from 'react';
import { useSkipper } from '../hooks/useSkipper';
import { EditableCell, EditableNumberCell } from './editable-cell';
import { Register } from '@/types/register.types';
import { Table, TableBody, TableCell, TableHead, TableHeader, TableRow } from '@/components/ui/table';
import CustomPagination from './pagination';
import { AddInput } from '@/components/add-input';
import { Checkbox } from '@/components/ui/checkbox';
import { CircleX } from 'lucide-react';
import { useTranslation } from 'react-i18next';

declare module '@tanstack/react-table' {
  interface TableMeta<TData extends RowData> {
    updateData: (rowIndex: number, columnId: string, value: unknown) => void;
    removeData: (rowIndex: number) => void;
    checkAllData: (value: boolean | 'indeterminate') => void;
  }
}

function CheckedHeaderCell({ table }: Readonly<HeaderContext<Register, unknown>>) {
  const rows = table.getRowModel().flatRows;
  const value = useMemo(() => {
    if (rows.length === 0) return false;
    const allChecked = rows.every((row) => row.original.checked);
    if (allChecked) return allChecked;
    return rows.some((row) => row.original.checked) ? 'indeterminate' : false;
  }, [rows]);

  return (
    <div className='text-center pr-2.5'>
      <Checkbox tabIndex={-1} checked={value} onCheckedChange={(value) => table.options.meta?.checkAllData(value)} />
    </div>
  );
}

function CheckedCell({ getValue, row: { index }, column: { id }, table }: Readonly<CellContext<Register, unknown>>) {
  return (
    <Checkbox
      tabIndex={-1}
      checked={getValue<boolean>()}
      onCheckedChange={(checked) => table.options.meta?.updateData(index, id, checked)}
    />
  );
}

function NameCell({ getValue, row: { index }, column: { id }, table }: Readonly<CellContext<Register, unknown>>) {
  return (
    <EditableCell
      tabIndex={-1}
      value={getValue<string>()}
      onBlur={(newValue) => {
        table.options.meta?.updateData(index, id, newValue);
      }}
    />
  );
}

function ValueCell({ getValue, row: { index }, column: { id }, table }: Readonly<CellContext<Register, unknown>>) {
  return (
    <EditableNumberCell
      value={getValue<number>()}
      onBlur={(newValue) => table.options.meta?.updateData(index, id, newValue)}
    />
  );
}

function DeleteCell({ row: { index }, table }: Readonly<CellContext<Register, unknown>>) {
  return (
    <button className='sm:invisible group-hover:visible' onClick={() => table.options.meta?.removeData(index)}>
      <CircleX size={20} />
    </button>
  );
}
type RegisterTableProps = {
  data: Array<Register>;
  onChange?: (newData: Array<Register>) => void;
};
export default function RegisterTable({ data, onChange }: Readonly<RegisterTableProps>) {
  const { t } = useTranslation('translation', { keyPrefix: 'registerTable' });
  const columns = useMemo<ColumnDef<Register>[]>(
    () => [
      {
        header: CheckedHeaderCell,
        id: 'checked',
        accessorKey: 'checked',
        cell: CheckedCell,
      },
      {
        header: t('name'),
        accessorKey: 'name',
        cell: NameCell,
      },
      {
        header: t('value'),
        accessorKey: 'value',
        cell: ValueCell,
      },
      {
        header: '',
        id: 'actions',
        cell: DeleteCell,
      },
    ],
    [t]
  );

  const [autoResetPageIndex, skipAutoResetPageIndex] = useSkipper();

  const updateData = useCallback(
    (rowIndex: number, columnId: string, value: unknown) => {
      skipAutoResetPageIndex();
      const newData = data.map((row, index) => {
        if (index === rowIndex) {
          return {
            ...row,
            [columnId]: value,
          };
        }
        return row;
      });
      onChange?.(newData);
    },
    [data, onChange, skipAutoResetPageIndex]
  );

  const addData = useCallback(
    (name: string | undefined) => {
      if (!name) return;
      skipAutoResetPageIndex();
      const newData = [...data];
      newData.push({
        id: generateId(),
        name,
        value: 0,
        checked: false,
      });
      onChange?.(newData);
    },
    [data, onChange, skipAutoResetPageIndex]
  );

  const removeData = useCallback(
    (rowIndex: number) => {
      skipAutoResetPageIndex();
      const newData = data.filter((_, index) => index !== rowIndex);
      onChange?.(newData);
    },
    [data, onChange, skipAutoResetPageIndex]
  );

  const checkAllData = useCallback(
    (value: boolean | 'indeterminate') => {
      skipAutoResetPageIndex();
      const newData = data.map((row) => {
        return {
          ...row,
          checked: value === 'indeterminate' ? true : value,
        };
      });
      onChange?.(newData);
    },
    [data, onChange, skipAutoResetPageIndex]
  );

  const table = useReactTable({
    data,
    columns,
    getCoreRowModel: getCoreRowModel(),
    getFilteredRowModel: getFilteredRowModel(),
    getPaginationRowModel: getPaginationRowModel(),
    initialState: {
      pagination: {
        pageSize: 20,
      },
    },
    autoResetPageIndex,
    meta: {
      updateData,
      removeData,
      checkAllData,
    },
  });

  return (
    <div className='p-1'>
      <div className='h-2' />
      <Table>
        <TableHeader>
          {table.getHeaderGroups().map((headerGroup) => (
            <TableRow key={headerGroup.id}>
              {headerGroup.headers.map((header) => {
                return (
                  <TableHead key={header.id} colSpan={header.colSpan} className='px-4'>
                    {header.isPlaceholder ? null : (
                      <div>{flexRender(header.column.columnDef.header, header.getContext())}</div>
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
              <TableRow key={row.id}>
                {row.getVisibleCells().map((cell) => {
                  return (
                    <TableCell align='center' className='group' key={cell.id}>
                      {flexRender(cell.column.columnDef.cell, cell.getContext())}
                    </TableCell>
                  );
                })}
              </TableRow>
            );
          })}
        </TableBody>
      </Table>
      <div className='flex py-2'>
        <AddInput
          placeholder={t('addNewRegister')}
          type='text'
          className='placeholder:text-stone-300'
          onAdd={addData}
        />
      </div>
      <CustomPagination
        pageIndex={table.getState().pagination.pageIndex}
        pageCount={table.getPageCount()}
        canNextPage={table.getCanNextPage()}
        canPreviousPage={table.getCanPreviousPage()}
        goNext={table.nextPage}
        goPrevious={table.previousPage}
        onChangePage={table.setPageIndex}
      />
    </div>
  );
}
