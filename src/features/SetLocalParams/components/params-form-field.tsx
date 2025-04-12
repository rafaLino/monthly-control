import { Checkbox } from '@/components/ui/checkbox';
import { FormControl, FormField, FormItem, FormLabel } from '@/components/ui/form';
import { Input } from '@/components/ui/input';
import { cn } from '@/lib/utils';
import { LocalParamsKeys } from '@/types/local-params';
import { FC } from 'react';
import { useFormContext } from 'react-hook-form';

type ParamsFormFieldProps = {
  name: LocalParamsKeys;
  label: string;
  type?: 'number' | 'checkbox';
  maxLength?: number;
  disabled?: boolean;
};
export const ParamsFormField: FC<ParamsFormFieldProps> = ({ label, name, disabled, maxLength, type = 'number' }) => {
  const { control } = useFormContext();
  return (
    <FormField
      control={control}
      name={name}
      disabled={disabled}
      render={({ field }) => (
        <FormItem>
          {type === 'checkbox' ? (
            <div className='flex items-center space-x-2'>
              <FormControl>
                <Checkbox id={name} disabled={disabled} checked={field.value} onCheckedChange={field.onChange} />
              </FormControl>
              <FormLabel
                htmlFor={name}
                className='capitalize aria-disabled:text-stone-400/50'
                aria-disabled={disabled}
              >
                {label}
              </FormLabel>
            </div>
          ) : (
            <>
              <FormLabel htmlFor={name} className='capitalize aria-disabled:text-stone-400/50' aria-disabled={disabled}>
                {label}
              </FormLabel>
              <FormControl>
                <Input
                  id={name}
                  className={cn('capitalize disabled:text-stone-400')}
                  placeholder={name}
                  type={type}
                  max={maxLength}
                  min={0}
                  {...field}
                />
              </FormControl>
            </>
          )}
        </FormItem>
      )}
    />
  );
};
