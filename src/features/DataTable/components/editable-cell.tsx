import { useEffect, useRef, useState } from 'react';
import { Input } from '@/components/ui/input';

type EditableCellProps = {
  value: string;
  type?: 'text' | 'number';
  onBlur?: (newValue: string, event: React.FocusEvent<HTMLInputElement>) => void;
  onFocus?: (event: React.FocusEvent<HTMLInputElement>) => void;
};
export const EditableCell: React.FC<EditableCellProps> = ({ value, type = 'text', onBlur, onFocus }) => {
  const [currentValue, setCurrentValue] = useState(value);
  const ref = useRef<HTMLInputElement>(null);
  useEffect(() => {
    setCurrentValue(value);
  }, [value]);

  const handleChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    setCurrentValue(e.target.value);
  };
  const handleBlur = (e: React.FocusEvent<HTMLInputElement>) => {
    onBlur?.(currentValue, e);
  };

  const handleKeyDown = (e: React.KeyboardEvent<HTMLInputElement>) => {
    if (e.key === 'Enter') {
      ref.current?.blur();
    }
  };

  return (
    <Input
      ref={ref}
      type={type}
      value={currentValue}
      onChange={handleChange}
      onBlur={handleBlur}
      onKeyDown={handleKeyDown}
      onFocus={onFocus}
      className='border-0 focus:border'
    />
  );
};

type EditableNumberCellProps = Omit<React.PropsWithoutRef<EditableCellProps>, 'value' | 'onBlur'> & {
  value: number;
  onBlur?: (newValue: number, event: React.FocusEvent<HTMLInputElement>) => void;
  formatter?: (value: number) => string;
};

export const EditableNumberCell: React.FC<EditableNumberCellProps> = ({ value, formatter, onBlur }) => {
  const [isEditing, setIsEditing] = useState(false);
  const formattedValue = isEditing ? getValue(value) : getFormatedValue(value, formatter);

  const handleFocus = () => {
    setIsEditing(true);
  };
  const handleBlur = (newValue: string, event: React.FocusEvent<HTMLInputElement>) => {
    onBlur?.(parseFloat(newValue), event);
    setIsEditing(false);
  };

  return (
    <EditableCell
      type={isEditing ? 'number' : 'text'}
      value={formattedValue}
      onFocus={handleFocus}
      onBlur={handleBlur}
    />
  );
};

function getValue(value: number) {
  return value ? value.toFixed(2) : '0';
}

function getFormatedValue(value: number, formatter?: (value: number) => string) {
  return formatter?.(value) ?? getValue(value);
}
