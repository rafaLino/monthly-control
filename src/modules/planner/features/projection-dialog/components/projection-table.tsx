import { Table, TableBody, TableCell, TableHead, TableHeader, TableRow } from '@/components/ui/table';
import { COLORS, getColor } from '@/lib/colors';
import { cn } from '@/lib/utils';
import { Register, RegisterType } from '@/types/register.types';
import { FC, memo, useCallback } from 'react';
import { useTranslation } from 'react-i18next';

type ProjectionTableProps = {
  records: Register[];
  type: RegisterType;
  onCheck: (id: string, type: RegisterType) => void;
};

const SPACE_BAR = ' ';

export const ProjectionTable: FC<ProjectionTableProps> = memo(({ records, type, onCheck }) => {
  const { t } = useTranslation('translation', { keyPrefix: 'projectionDialog' });
  const color = COLORS[getColor(type)];

  const onClickOrKeyDown = useCallback(
    (id: string) => (e: React.KeyboardEvent | React.MouseEvent<HTMLTableRowElement>) => {
      if (e.type === 'click' || (e as React.KeyboardEvent).key == SPACE_BAR) {
        onCheck(id, type);
      }
    },
    [onCheck, type]
  );

  return (
    <Table parentClassName={cn('border rounded-sm shadow-md h-full min-h-96', color.border)}>
      <TableHeader className="sticky top-0 bg-gray-200">
        <TableRow>
          <TableHead>{t('name')}</TableHead>
          <TableHead>{t('value')}</TableHead>
        </TableRow>
      </TableHeader>
      <TableBody className="overflow-auto">
        {records.map((record) => (
          <TableRow
            key={record.id}
            tabIndex={0}
            data-state={record.checked ? 'selected' : 'unselected'}
            className={cn('focus:outline-none focus:bg-black/10 data-[state=selected]:bg-gray-300')}
            onClick={onClickOrKeyDown(record.id)}
            onKeyDown={onClickOrKeyDown(record.id)}
          >
            <TableCell className="p-2 pl-5 font-medium">{record.name}</TableCell>
            <TableCell className="p-2 pl-5">{record.value}</TableCell>
          </TableRow>
        ))}
      </TableBody>
    </Table>
  );
});
ProjectionTable.displayName = 'ProjectionTable';
