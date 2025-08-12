import { ComponentPropsWithoutRef, memo } from 'react';
import { Input } from '../../../../components/ui/input';
import { useAddInput } from './hooks/useAddInput';

type AddInputProps = ComponentPropsWithoutRef<typeof Input> & {
  onAdd: (name: string, value: number) => void;
};

export const AddInput: React.FC<AddInputProps> = memo(({ onAdd, ...props }) => {
  const { ref, onEnter } = useAddInput(onAdd);
  return <Input {...props} ref={ref} onKeyDown={onEnter} data-testid="add_new" />;
});
