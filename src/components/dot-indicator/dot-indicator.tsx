import { cn } from '@/lib/utils';
import { FC } from 'react';

type Props = {
  active?: boolean;
  animate?: boolean;
  className?: string;
};
export const DotIndicator: FC<Props> = ({ active, animate, className }) => {
  return active ? (
    <span
      className={cn('flex w-3 h-3 me-3 bg-teal-500 rounded-full absolute -top-1 -right-4', animate && 'animate-pulse', className)}
    />
  ) : null;
};
