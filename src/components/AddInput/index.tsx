import { ComponentPropsWithoutRef, useRef } from 'react';
import { Input } from '../ui/input';

type AddInputProps = ComponentPropsWithoutRef<typeof Input> & {
  onAdd: (value: string) => void;
};
export const AddInput: React.FC<AddInputProps> = ({ onAdd, ...props }) => {
  const ref = useRef<HTMLInputElement>(null);
  const onPress = (event: React.KeyboardEvent<HTMLInputElement>) => {
    if (event.key === 'Enter' && ref.current) {
      event.preventDefault();
      onAdd(event.currentTarget.value);
      ref.current?.blur();
      ref.current.value = '';
    }
  };
  return <Input {...props} ref={ref} onKeyDown={onPress} />;
};
