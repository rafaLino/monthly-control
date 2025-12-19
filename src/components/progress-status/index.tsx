import { Activity } from 'react';
import { Progress } from '../ui/progress';

type ProgressStatusProps = {
  show?: boolean;
};
export function ProgressStatus({ show }: ProgressStatusProps) {
  return (
    <Activity mode={show ? 'visible' : 'hidden'}>
      <Progress indeterminate className="h-0.5 absolute" />
    </Activity>
  );
}
