export * from '@tanstack/react-table';
declare module '@tanstack/react-table' {
  interface TableMeta<TData extends RowData> {
    updateData: (index: number, columnId: string, value: unknown) => void;
    removeData: (index: number) => void;
    checkAllData: (value: boolean | 'indeterminate') => void;
    total: number;
  }
}
