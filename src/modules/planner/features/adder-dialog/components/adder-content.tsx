import { Button } from '@/components/ui/button';
import { Label } from '@/components/ui/label';
import { RadioGroup, RadioGroupItem } from '@/components/ui/radio-group';
import { useSet } from '@/hooks/useSet';
import { Colors, getColorClasses } from '@/lib/colors';
import { cn, sum } from '@/lib/utils';
import { useReadRegisters } from '@/store';
import { Register, RegisterType, RegisterTypes } from '@/types/register.types';
import { FC, MouseEvent, useState } from 'react';
import { Translation } from 'react-i18next';

export const AdderContent: FC = () => {
  const [type, setType] = useState<RegisterType>('expenses');
  const items = useReadRegisters(type);
  const set = useSet<string>();
  const color = getColorClasses(type);

  const selectedItems = items.filter((item) => set.has(item.id));
  const total = sum(selectedItems);

  const handleSelect = (event: MouseEvent<HTMLButtonElement>) => {
    const id = event.currentTarget.dataset.id!;
    set.toggle(id);
  };

  const handleClear = () => {
    set.clear();
  };

  return (
    <section className="flex flex-col justify-between py-20 h-full items-center gap-2 bg-muted">
      <div className="flex flex-col gap-2 items-center">
        <RegisterSelection className="mb-4" value={type} onChange={setType} />
        <Result value={total} color={color} />
        <Actions total={total} onClick={handleClear} />
      </div>
      <Items items={items} onClick={handleSelect} isActive={set.has} />
    </section>
  );
};

const RegisterSelection: FC<{
  value: RegisterType;
  onChange: (value: RegisterType) => void;
  className?: string;
}> = ({ value, onChange, className }) => {
  return (
    <RadioGroup className={cn('flex flex-row', className)} defaultValue="expenses" value={value} onValueChange={onChange}>
      {RegisterTypes.map((type) => (
        <div key={type} className="flex items-center gap-x-4">
          <RadioGroupItem value={type} id={type} />
          <Translation keyPrefix="adderDialog">{(t) => <Label htmlFor={type}>{t(type)}</Label>}</Translation>
        </div>
      ))}
    </RadioGroup>
  );
};

const Actions: FC<{
  total: number;
  onClick: () => void;
}> = ({ total, onClick }) => {
  return (
    <div className="min-h-10">
      {total > 0 && (
        <Button size="sm" className="w-full" onClick={onClick}>
          <Translation keyPrefix="adderDialog">{(t) => t('clear')}</Translation>
        </Button>
      )}
    </div>
  );
};

const Result: FC<{ value: number; color: Colors }> = ({ value, color }) => {
  return (
    <div
      className={cn(
        'flex justify-center items-center border outline shadow-xl rounded-md p-4 w-80 h-32 bg-muted',
        color.background,
        color.border,
        color.text
      )}
    >
      <Translation>
        {(t) => (
          <span className="font-serif font-light text-3xl inline-block text-ellipsis whitespace-nowrap overflow-hidden">
            {t('currency', { value })}
          </span>
        )}
      </Translation>
    </div>
  );
};

const Items: FC<{
  items: Array<Register>;
  onClick: (event: MouseEvent<HTMLButtonElement>) => void;
  isActive: (value: string) => boolean;
}> = ({ items, isActive, onClick }) => {
  return (
    <div className="flex flex-row flex-wrap justify-center px-2 gap-2 overflow-auto max-w-full sm:max-w-1/2 max-h-64">
      {items.map((item) => (
        <button
          key={item.id}
          data-id={item.id}
          onClick={onClick}
          className={cn(
            'flex flex-col justify-evenly p-2 bg-current/10 rounded-md shadow-md cursor-pointer size-20',
            isActive(item.id) && 'bg-current/20'
          )}
        >
          <Translation>
            {(t) => (
              <span className="text-xs font-bold text-neutral-600 dark:text-neutral-200">
                {t('currency', { value: item.value })}
              </span>
            )}
          </Translation>
          <span
            title={item.name}
            className="text-xs font-light text-neutral-600/80 dark:text-neutral-200/80 inline-block whitespace-pre-line text-ellipsis overflow-hidden"
          >
            {item.name}
          </span>
        </button>
      ))}
    </div>
  );
};
