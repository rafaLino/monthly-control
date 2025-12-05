import { Button } from '@/components/ui/button';
import { FormControl, FormField, FormItem } from '@/components/ui/form';
import { Input } from '@/components/ui/input';
import { cn } from '@/lib/utils';
import { useSettingsForm } from '@/modules/settings/components/setting-form/settings-form-hook';
import { CircleMinus, CirclePlus } from 'lucide-react';
import { useFieldArray, useFormContext } from 'react-hook-form';
import { ExpensesCategoryFormField } from './expenses-category-form-field';
import { MouseEvent } from 'react';

export function ExpensesCategoryForm() {
  const { enabled } = useSettingsForm();
  const { control } = useFormContext();

  const { fields, append, remove } = useFieldArray({ control, name: 'categories' });

  const handleAdd = () => {
    append({ name: '', value: [] });
  };

  const handleRemove = (e: MouseEvent<HTMLButtonElement>) => {
    const index = Number(e.currentTarget.dataset.index)
    remove(index)
  }
  return (
    <div className="grid grid-cols-[50px_1fr] gap-2 items-center">
      <Button type="button" disabled={!enabled} variant="link" size="sm" onClick={handleAdd}>
        <CirclePlus />
      </Button>
      <div className="flex flex-col gap-4">
        {fields.map((item, index) => (
          <div key={item.id} className="flex flex-row gap-4 items-center">
            <FormField
              control={control}
              disabled={!enabled}
              name={`categories.${index}.name`}
              render={({ field: { value, ...field }, fieldState: { invalid } }) => (
                <FormItem className={cn(invalid && 'border border-red-400 rounded-md')}>
                  <FormControl>
                    <Input
                      {...field}
                      value={value.toLowerCase()}
                      className="max-w-40"
                    />
                  </FormControl>
                </FormItem>
              )}
            />
            <ExpensesCategoryFormField name={`categories.${index}.value`} disabled={!enabled} />
            <Button
              data-index={index}
              type="button"
              disabled={!enabled}
              variant="link"
              size="sm"
              onClick={handleRemove}
              className='text-red-500'
            >
              <CircleMinus />
            </Button>
          </div>
        ))}
      </div>
    </div>
  );
}
