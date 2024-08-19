/* eslint-disable @typescript-eslint/no-unused-vars */
import { formatCurrency } from '@/lib/utils';
import {
  CellContext,
  ColumnDef,
  flexRender,
  getCoreRowModel,
  getFilteredRowModel,
  getPaginationRowModel,
  RowData,
  useReactTable,
} from '@tanstack/react-table';
import { useMemo } from 'react';
import { Checkbox } from '../../ui/checkbox';
import { useSkipper } from '../hooks/useSkipper';
import { EditableCell, EditableNumberCell } from './editable-cell';
import { Register } from '@/types/register.types';
import { Table, TableBody, TableCell, TableHead, TableHeader, TableRow } from '@/components/ui/table';
import CustomPagination from './pagination';

declare module '@tanstack/react-table' {
  interface TableMeta<TData extends RowData> {
    updateData: (rowIndex: number, columnId: string, value: unknown) => void;
  }
}

function CheckedCell({ getValue, row: { index }, column: { id }, table }: Readonly<CellContext<Register, unknown>>) {
  return (
    <Checkbox
      checked={getValue<boolean>()}
      onCheckedChange={(checked) => table.options.meta?.updateData(index, id, checked)}
    />
  );
}

function NameCell({ getValue, row: { index }, column: { id }, table }: Readonly<CellContext<Register, unknown>>) {
  return (
    <EditableCell
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
      formatter={formatCurrency}
      onBlur={(newValue) => table.options.meta?.updateData(index, id, newValue)}
    />
  );
}
type RegisterTableProps = {
  data: Array<Register>;
  onChange?: (newData: Array<Register>) => void;
};
export default function RegisterTable({ data, onChange }: Readonly<RegisterTableProps>) {
  const columns = useMemo<ColumnDef<Register>[]>(
    () => [
      {
        id: 'checked',
        cell: CheckedCell,
      },
      {
        header: 'Name',
        accessorKey: 'name',
        cell: NameCell,
      },
      {
        header: 'Value',
        accessorKey: 'value',
        cell: ValueCell,
      },
    ],
    []
  );

  const [autoResetPageIndex, skipAutoResetPageIndex] = useSkipper();

  const updateData = (rowIndex: number, columnId: string, value: unknown) => {
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
  };

  const table = useReactTable({
    data,
    columns,
    getCoreRowModel: getCoreRowModel(),
    getFilteredRowModel: getFilteredRowModel(),
    getPaginationRowModel: getPaginationRowModel(),
    autoResetPageIndex,
    // Provide our updateData function to our table meta
    meta: {
      updateData,
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
                  <TableHead key={header.id} colSpan={header.colSpan}>
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
                    <TableCell key={cell.id}>{flexRender(cell.column.columnDef.cell, cell.getContext())}</TableCell>
                  );
                })}
              </TableRow>
            );
          })}
        </TableBody>
      </Table>
      <CustomPagination
        pageIndex={table.getState().pagination.pageIndex}
        pageCount={table.getPageCount()}
        canNextPage={table.getCanNextPage()}
        canPreviousPage={table.getCanPreviousPage()}
        goNext={table.nextPage}
        goPrevious={table.previousPage}
      />
    </div>
  );
}
