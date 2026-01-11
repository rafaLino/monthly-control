import { cn } from '@/lib/utils';
import { FileReponseData, TRefDate } from '@/types/refDate';
import { ComponentPropsWithoutRef, FC, MouseEvent } from 'react';

export const Files: FC<{
  items: Array<FileReponseData> | undefined;
  active: TRefDate | null;
  onClick?: (event: MouseEvent<HTMLButtonElement>) => void;
}> = ({ items, active, onClick }) => {
  const alreadySaved = items?.some((x) => x.ref === active);
  return (
    <div className="flex justify-start flex-wrap col-span-2 items-center gap-2 text-center">
      {items?.map((item) => (
        <FileChip
          key={item.ref}
          data-state={item.ref === active ? 'opened' : 'closed'}
          data-value={item.ref}
          active={alreadySaved}
          value={item.ref}
          onClick={onClick}
        />
      ))}
      {!alreadySaved && active && (
        <FileChip data-state="new" data-value={active} placholder={true} value={active} onClick={onClick} />
      )}
    </div>
  );
};

const FileChip: FC<
  ComponentPropsWithoutRef<'button'> & {
    value: string;
    active?: boolean;
    placholder?: boolean;
  }
> = ({ value, active = false, placholder, ...props }) => {
  return (
    <button
      key={value}
      type="button"
      className={cn(
        'bg-amber-400 hover:bg-amber-500 text-primary-foreground rounded-lg px-2 py-1 text-xs max-h-8 cursor-pointer',
        active && 'bg-indigo-400 hover:bg-indigo-500',
        placholder && 'border border-dashed border-current bg-transparent text-shadow-white hover:bg-transparent hover:opacity-80'
      )}
      {...props}
    >
      {value}
    </button>
  );
};
