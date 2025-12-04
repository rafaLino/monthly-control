import { Button } from '@/components/ui/button';
import { cn } from '@/lib/utils';
import { SortDirection } from '@tanstack/react-table';
import { ArrowDown, ArrowUp } from 'lucide-react';
import { FC } from 'react';

type SortingButtonProps = {
  canSort: boolean;
  isSorted: SortDirection | false;
  toggle: ((event: unknown) => void) | undefined;
};
export const SortingButton: FC<SortingButtonProps> = ({ canSort, isSorted, toggle }) => {
  return canSort ? (
    <Button variant="link" onClick={toggle} className={cn(!Boolean(isSorted) && 'invisible group-hover:visible')}>
      <SortingIcon direction={isSorted} />
    </Button>
  ) : null;
};

const SortingIcon: FC<{ direction: SortDirection | false }> = ({ direction }) => {
  if (!direction) return null;

  return direction === 'asc' ? <ArrowDown className="h-4 w-4" /> : <ArrowUp className="h-4 w-4" />;
};
