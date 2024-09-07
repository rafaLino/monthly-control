import { Progress } from '../ui/progress';

type ProgressStatusProps = {
  show?: boolean;
};
export function ProgressStatus({ show }: ProgressStatusProps) {
  return show ? <Progress indeterminate className="h-0.5" /> : null;
}
