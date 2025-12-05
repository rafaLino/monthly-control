import { cn } from '@/lib/utils';
import { RotateCw } from 'lucide-react';
import { ComponentPropsWithoutRef, FC } from 'react';
import { Button } from '../ui/button';

type LoadButtonProps = ComponentPropsWithoutRef<'button'> & {
  pending?: boolean;
};

export const LoadButton: FC<LoadButtonProps> = ({ hidden, pending, ...props }) => {
  return hidden ? null : (
    <Button {...props} size="icon" variant="ghost" className="hover:bg-transparent" disabled={pending}>
      <RotateCw className={cn('w-4 h-4', pending && 'animate-spin')} />
    </Button>
  );
};
