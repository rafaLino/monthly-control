import { Label } from '@/components/ui/label';
import { Switch } from '@/components/ui/switch';
import { Trash2 } from 'lucide-react';
import { FC, MouseEvent } from 'react';

type FlagItemProps = {
  item: { key: string; value: string };
  onChange: (value: 'ON' | 'OFF', key: string) => void;
  onRemove: (event: MouseEvent<HTMLButtonElement>) => void;
};
export const FlagItem: FC<FlagItemProps> = ({ item, onChange, onRemove }) => {
  const handleChange = (value: boolean) => onChange(value ? 'ON' : 'OFF', item.key);
  const valueAsBoolean = item.value === 'ON';
  return (
    <div className="grid gap-3">
      <Label htmlFor={item.key}>{item.key}</Label>
      <div className="flex flex-row justify-between">
        <Switch id={item.key} checked={valueAsBoolean} onCheckedChange={handleChange} />
        <button hidden={valueAsBoolean} data-key={item.key} onClick={onRemove}>
          <Trash2 size={14} className="text-slate-500" />
        </button>
      </div>
    </div>
  );
};
