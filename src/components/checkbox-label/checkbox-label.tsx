import { ComponentPropsWithoutRef, FC } from 'react';
import { Checkbox } from '../ui/checkbox';

type Props = ComponentPropsWithoutRef<typeof Checkbox> & {
  label?: string;
};

export const CheckBoxWithLabel: FC<Props> = ({ label, id, ...props }) => {
  return (
    <div className="flex items-center gap-x-2">
      <Checkbox id={id} {...props} />
      <label htmlFor={id} className="text-sm font-medium leading-none peer-disabled:cursor-not-allowed peer-disabled:opacity-70">
        {label}
      </label>
    </div>
  );
};
