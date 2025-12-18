import { Button } from '@/components/ui/button';
import { FormControl, FormField, FormItem } from '@/components/ui/form';
import { Input } from '@/components/ui/input';
import { useTimeout } from '@/hooks/useTimeout';
import { cn } from '@/lib/utils';
import { useSettingsForm } from '@/modules/settings/components/setting-form/settings-form-hook';
import { CircleMinus, CirclePlus } from 'lucide-react';
import { MouseEvent, useRef } from 'react';
import { useFieldArray, useFormContext } from 'react-hook-form';
import { ExpenseCategoriesFormField } from './expense-categories-form-field';

export function ExpenseCategoriesForm() {
  const { enabled } = useSettingsForm();
  const { control } = useFormContext();
  const buttonRef = useRef<HTMLButtonElement>(null);

  const runAction = useTimeout(() => buttonRef.current?.scrollIntoView({ behavior: 'smooth' }));

  const { fields, append, remove } = useFieldArray({ control, name: 'categories' });

  const handleAdd = () => {
    append({ name: '', value: [] });
    runAction();
  };

  const handleRemove = (e: MouseEvent<HTMLButtonElement>) => {
    const index = Number(e.currentTarget.dataset.index);
    remove(index);
  };

  return (
    <div className="flex flex-col w-full gap-2">
      {fields.map((item, index) => (
        <div key={item.id} className="flex flex-col gap-2 justify-between">
          <div className="flex justify-between">
            <FormField
              control={control}
              disabled={!enabled}
              name={`categories.${index}.name`}
              render={({ field: { value, ...field }, fieldState: { invalid } }) => (
                <FormItem className={cn(invalid && 'border border-red-400 rounded-md')}>
                  <FormControl>
                    <Input {...field} value={value.toLowerCase()} className="max-w-40" />
                  </FormControl>
                </FormItem>
              )}
            />
            <Button
              data-index={index}
              aria-hidden={index === 0}
              type="button"
              disabled={!enabled}
              variant="link"
              size="sm"
              onClick={handleRemove}
              className="text-red-500 aria-hidden:invisible"
            >
              <CircleMinus />
            </Button>
          </div>
          <ExpenseCategoriesFormField name={`categories.${index}.value`} disabled={!enabled} />
        </div>
      ))}
      <Button ref={buttonRef} type="button" disabled={!enabled} variant="default" size="sm" onClick={handleAdd}>
        <CirclePlus />
      </Button>
    </div>
  );
}
