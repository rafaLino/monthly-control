import { MultiCombobox } from '@/components/multi-combobox';
import { FormControl, FormField, FormItem } from '@/components/ui/form';
import { cn } from '@/lib/utils';
import { load, useReadRegisters } from '@/store';
import { FC } from 'react';
import { useFormContext } from 'react-hook-form';
import { useTranslation } from 'react-i18next';

type ExpensesCategoryFormField = {
  name: string;
  disabled?: boolean;
};
export const ExpensesCategoryFormField: FC<ExpensesCategoryFormField> = ({ name, disabled }) => {
  const { t } = useTranslation('translation', { keyPrefix: 'expensesCategorySettings' });
  const { control } = useFormContext();
  const options = useReadRegisters('expenses', (items) => items.map((x) => x.name.trim()));

  return (
    <FormField
      control={control}
      name={name}
      disabled={disabled}
      render={({ field: { value, disabled, onChange }, fieldState }) => (
        <FormItem className={cn(fieldState.invalid && 'border border-red-400 rounded-md')}>
          <FormControl>
            <MultiCombobox
              options={options}
              disabled={disabled}
              values={value}
              emptyMessage={t('comboBoxEmpty')}
              placeholder={t('comboBoxPlaceholder')}
              onChange={onChange}
              loadOptions={load}
            />
          </FormControl>
        </FormItem>
      )}
    />
  );
};
