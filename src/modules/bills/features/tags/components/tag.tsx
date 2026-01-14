import { cn } from '@/lib/utils';
import { TagIcon } from 'lucide-react';
import { MouseEvent, PropsWithChildren, forwardRef } from 'react';

type Props = PropsWithChildren<{
  name?: string;
  selected?: boolean;
  onClick?: (e: MouseEvent<HTMLButtonElement>) => void;
}>;
export const Tag = forwardRef<HTMLButtonElement, Props>(({ name, selected, children, onClick }, ref) => {
  return (
    <button
      ref={ref}
      data-id={name}
      onClick={onClick}
      className={cn(
        'inline-flex items-center justify-center gap-2 rounded-lg bg-sky-50 py-1 px-2 text-xs text-sky-700 hover:bg-sky-100',
        selected && 'bg-sky-200 font-medium'
      )}
    >
      <TagIcon className="size-3" />
      {name && <span>{name}</span>}
      {children}
    </button>
  );
});
