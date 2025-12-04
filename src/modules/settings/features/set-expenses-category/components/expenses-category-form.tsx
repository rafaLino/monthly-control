import { Button } from '@/components/ui/button';
import { FormControl, FormField, FormItem } from '@/components/ui/form';
import { Input } from '@/components/ui/input';
import { cn } from '@/lib/utils';
import { useSettingsForm } from '@/modules/settings/components/setting-form/settings-form-hook';
import { CirclePlus } from 'lucide-react';
import { useFieldArray, useFormContext } from 'react-hook-form';
import { ExpensesCategoryFormField } from './expenses-category-form-field';

export function ExpensesCategoryForm() {
  const { enabled } = useSettingsForm();
  const { control } = useFormContext();

  const { fields, append } = useFieldArray({ control, name: 'categories' });

  const handleAdd = () => {
    append({ name: '', value: [] });
  };
  return (
    <div className="grid grid-cols-[50px_1fr] gap-2">
      <Button type="button" disabled={!enabled} variant="ghost" size="sm" onClick={handleAdd}>
        <CirclePlus />
      </Button>
      <div className="flex flex-col gap-4">
        {fields.map((item, index) => (
          <div key={item.id} className="flex flex-row gap-4 items-center">
            <FormField
              control={control}
              disabled={!enabled}
              name={`categories.${index}.name`}
              render={({ field, fieldState }) => (
                <FormItem className={cn(fieldState.invalid && 'border border-red-400 rounded-md')}>
                  <FormControl>
                    <Input {...field} className="max-w-40" />
                  </FormControl>
                </FormItem>
              )}
            />
            <ExpensesCategoryFormField name={`categories.${index}.value`} disabled={!enabled} />
          </div>
        ))}
      </div>
    </div>
  );
}
