import {
  FormControl,
  FormField,
  FormItem,
  FormLabel,
} from '@/components/ui/form';
import { Input } from '@/components/ui/input';
import { RegisterType } from '@/types/register.types';
import { FC } from 'react';
import { useFormContext } from 'react-hook-form';

type GoalFormFieldProps = {
  name: RegisterType;
  disabled?: boolean;
};
export const GoalFormField: FC<GoalFormFieldProps> = ({ name, disabled }) => {
  const { control } = useFormContext();
  return (
    <FormField
      control={control}
      name={name}
      disabled={disabled}
      render={({ field }) => (
        <FormItem>
          <FormLabel
            className="capitalize aria-disabled:text-stone-400/50"
            aria-disabled={disabled}
          >
            {name}
          </FormLabel>
          <FormControl>
            <Input
              className="capitalize disabled:text-stone-400"
              placeholder={name}
              type="number"
              step={0.01}
              {...field}
            />
          </FormControl>
        </FormItem>
      )}
    />
  );
};
