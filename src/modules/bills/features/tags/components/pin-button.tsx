import { Button } from '@/components/ui/button';
import { cn } from '@/lib/utils';
import { PinIcon } from 'lucide-react';
import { FC, MouseEvent } from 'react';

export const PinButton: FC<{ value: number; selected?: boolean; onClick?: (e: MouseEvent<HTMLButtonElement>) => void }> = ({
  value,
  selected,
  onClick
}) => {
  return (
    <Button
      data-selected={selected}
      data-value={value}
      variant="link"
      size="icon"
      className="data-[selected=true]:text-sky-700 rounded-full"
      onClick={onClick}
    >
      <PinIcon className={cn('size-4', selected && 'rotate-45')} />
    </Button>
  );
};
