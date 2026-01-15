import { AddInput } from '@/components/add-input';
import { EditableCell, EditableNumberCell } from '@/components/editable-cell';
import { Badge } from '@/components/ui/badge';
import { Button } from '@/components/ui/button';
import { Input } from '@/components/ui/input';
import { Popover, PopoverContent, PopoverTrigger } from '@/components/ui/popover';
import { Table, TableBody, TableCell, TableHead, TableHeader, TableRow } from '@/components/ui/table';
import { XCircle, XIcon } from 'lucide-react';
import { FC, KeyboardEvent, MouseEvent } from 'react';
import { Translation } from 'react-i18next';
import { useBills } from '../../context/hooks/useBills';
import { Bill } from '../../types';
import { Tag } from '../tags/components/tag';

export const BillsTable: FC<{
  data: Bill[];
  onRemove: (event: MouseEvent<HTMLButtonElement>) => void;
  onChange: (bill: Bill) => void;
  onAdd: (name: string, amount: number) => void;
}> = ({ data, onChange, onRemove, onAdd }) => {
  const { calculateBillPercentage } = useBills();
  return (
    <div className="grid grid-rows-[auto_1fr] h-full gap-2 overflow-hidden">
      <AddInput id="add-bill" onAdd={onAdd} />
      <Table parentClassName="sm:h-190 overflow-auto" className="w-full">
        <TableHeader className="sticky bg-secondary top-0">
          <TableRow>
            <TableHead className="w-80">Title</TableHead>
            <TableHead>Amount</TableHead>
            <TableHead className="w-0" />
            <TableHead>%</TableHead>
            <TableHead className="w-0" />
          </TableRow>
        </TableHeader>
        <TableBody>
          {data.map((bill) => (
            <TableRow key={bill.id}>
              <TableCell className="px-2">
                <EditableCell
                  id={`title-${bill.id}`}
                  value={bill.title}
                  onBlur={(newValue) => onChange?.({ ...bill, title: newValue })}
                />
              </TableCell>
              <TableCell>
                <EditableNumberCell
                  id={`amount-${bill.id}`}
                  value={bill.amount}
                  onBlur={(newValue) => onChange?.({ ...bill, amount: newValue })}
                />
              </TableCell>
              <TableCell className="px-2 text-center">
                <PopoverTags tags={bill.tags} onChange={(tags) => onChange?.({ ...bill, tags })} />
              </TableCell>
              <TableCell>
                <PercentBadge value={calculateBillPercentage(bill)} />
              </TableCell>
              <TableCell className="group">
                <Button
                  variant="link"
                  size="icon"
                  className="cursor-pointer sm:invisible group-hover:visible"
                  data-id={bill.id}
                  onClick={onRemove}
                >
                  <XCircle className="size-4" />
                </Button>
              </TableCell>
            </TableRow>
          ))}
        </TableBody>
      </Table>
    </div>
  );
};

const PercentBadge: FC<{ value: number }> = ({ value }) => {
  return (
    <Badge variant="secondary">
      <Translation>{(t) => t('percentage', { value })}</Translation>
    </Badge>
  );
};

const PopoverTags: FC<{ tags: string[]; onChange?: (tags: string[]) => void }> = ({ tags, onChange }) => {
  const handleEnter = (e: KeyboardEvent) => {
    if (e.key === 'Enter') {
      e.preventDefault();
      const target = e.currentTarget as HTMLInputElement;
      onChange?.([...tags, target.value]);
      target.value = '';
    }
  };
  return (
    <Popover>
      <PopoverTrigger asChild>
        <Tag />
      </PopoverTrigger>
      <PopoverContent>
        <div className="flex flex-wrap gap-2">
          <Input placeholder="Add tag..." className="w-full" onKeyDown={handleEnter} />
          {tags.length === 0 && <span className="text-sm text-muted-foreground">No tags</span>}
          {tags.map((tag) => (
            <Tag key={tag} name={tag} selected>
              <div role="button" className="p-0 cursor-pointer" onClick={() => onChange?.(tags.filter((t) => t !== tag))}>
                <XIcon className="size-3" />
              </div>
            </Tag>
          ))}
        </div>
      </PopoverContent>
    </Popover>
  );
};
