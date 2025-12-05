import { Button } from '@/components/ui/button';
import { Command, CommandEmpty, CommandGroup, CommandInput, CommandItem, CommandList } from '@/components/ui/command';
import { Popover, PopoverContent, PopoverTrigger } from '@/components/ui/popover';
import { cn } from '@/lib/utils';
import { Check, ChevronDown } from 'lucide-react';
import { MouseEvent, useState } from 'react';
import { LoadButton } from '../load-button';

type ExpensesComboBoxProps = {
  onChange?: (selected: string[]) => void;
  values: string[];
  options: string[];
  emptyMessage?: string;
  placeholder?: string;
  disabled?: boolean;
  loadOptions?: (event: MouseEvent<HTMLButtonElement>) => Promise<void>;
};
export function MultiCombobox({
  values,
  options,
  emptyMessage,
  placeholder,
  disabled,
  loadOptions,
  onChange
}: Readonly<ExpensesComboBoxProps>) {
  const [open, setOpen] = useState(false);

  const handleSelect = (value: string) => {
    if (!values) return;

    const newValues = values.includes(value) ? values.filter((x) => x !== value) : [...values, value];
    onChange?.(newValues);
  };

  return (
    <div aria-disabled={disabled} className={cn('flex items-center space-x-4', disabled && 'cursor-not-allowed')}>
      <Popover open={open} onOpenChange={setOpen}>
        <div
          className={cn(
            'flex border px-2 gap-1 rounded items-center justify-between w-full min-w-64 relative',
            disabled && 'opacity-50'
          )}
        >
          <div className="flex flex-wrap gap-1 py-2 mr-6 min-h-10">
            {values.map((value) => (
              <span key={value} className="bg-primary text-primary-foreground rounded-lg px-2 py-1 text-xs">
                {value}
              </span>
            ))}
          </div>
          <PopoverTrigger asChild type="button" disabled={disabled}>
            <Button size="sm" variant="ghost" className="hover:bg-transparent px-2 absolute right-0 w-full justify-end">
              <ChevronDown className="w-4 h-4" />
            </Button>
          </PopoverTrigger>
        </div>
        <PopoverContent className="p-0" side='bottom' align='start'>
          <Command>
            <CommandInput
              placeholder={placeholder}
              endIcon={<LoadButton hidden={!loadOptions || options.length > 0} onClick={loadOptions} />}
            />
            <CommandList>
              <CommandEmpty>{emptyMessage}</CommandEmpty>
              <CommandGroup>
                {options.map((item) => (
                  <CommandItem key={item} value={item} onSelect={handleSelect} className="justify-between">
                    {item}
                    {values.includes(item) && <Check className="w-4 h-2" />}
                  </CommandItem>
                ))}
              </CommandGroup>
            </CommandList>
          </Command>
        </PopoverContent>
      </Popover>
    </div>
  );
}
