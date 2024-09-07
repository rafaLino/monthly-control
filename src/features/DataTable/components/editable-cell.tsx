import { Input } from '@/components/ui/input';
import { TFunction } from 'i18next';
import { useEffect, useRef, useState } from 'react';
import { useTranslation } from 'react-i18next';

type EditableCellProps = Omit<React.InputHTMLAttributes<HTMLInputElement>, 'onBlur'> & {
  value: string;
  type?: 'text' | 'number';
  onBlur?: (newValue: string, event: React.FocusEvent<HTMLInputElement>) => void;
  onFocus?: (event: React.FocusEvent<HTMLInputElement>) => void;
};
export const EditableCell: React.FC<EditableCellProps> = ({ value, type = 'text', onBlur, onFocus, ...props }) => {
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
      className="border-0 focus:border"
      {...props}
    />
  );
};

type EditableNumberCellProps = Omit<React.PropsWithoutRef<EditableCellProps>, 'value' | 'onBlur'> & {
  value: number;
  onBlur?: (newValue: number, event: React.FocusEvent<HTMLInputElement>) => void;
};

export const EditableNumberCell: React.FC<EditableNumberCellProps> = ({ value, onBlur }) => {
  const { t } = useTranslation();
  const [isEditing, setIsEditing] = useState(false);
  const formattedValue = isEditing ? getValue(value) : getFormatedValue(value, t);

  const handleFocus = () => {
    setIsEditing(true);
  };
  const handleBlur = (newValue: string, event: React.FocusEvent<HTMLInputElement>) => {
    const num = parseFloat(newValue);
    onBlur?.(isNaN(num) ? 0 : num, event);
    setIsEditing(false);
  };

  return <EditableCell type={isEditing ? 'number' : 'text'} value={formattedValue} onFocus={handleFocus} onBlur={handleBlur} />;
};

function getValue(value: number) {
  return value ? value.toFixed(2) : '';
}

function getFormatedValue(value: number, formatter?: TFunction<'translation', undefined>) {
  return formatter?.('currency', { value }) ?? getValue(value);
}
