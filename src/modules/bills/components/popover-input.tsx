import { Input } from '@/components/ui/input';
import { Popover, PopoverContent, PopoverTrigger } from '@/components/ui/popover';
import { useOnEnter } from '@/hooks/useOnEnter';
import { FC, PropsWithChildren, useState } from 'react';

export const PopoverInput: FC<
  PropsWithChildren<{
    value?: number;
    onChange?: (newValue: number) => void;
  }>
> = ({ value = 0, children, onChange }) => {
  const [open, setOpen] = useState(false);

  const handleEnter = useOnEnter<HTMLInputElement>((e) => {
    setOpen(false);
    onChange?.(Number(e.currentTarget.value));
  });

  return (
    <Popover open={open} onOpenChange={setOpen}>
      <PopoverTrigger asChild>{children}</PopoverTrigger>
      <PopoverContent>
        <div className="flex flex-wrap gap-2">
          <Input name="fund" defaultValue={value} onKeyDown={handleEnter} className="w-full" />
        </div>
      </PopoverContent>
    </Popover>
  );
};
