import { Button } from '@/components/ui/button';
import { useKeyDown } from '@/hooks/useKeyDown';
import { cn } from '@/lib/utils';
import { RefreshCw } from 'lucide-react';
import { useSave } from '../hooks/useSave';

export const SyncButton = () => {
  const [saving, save] = useSave();
  useKeyDown('ctrl.s', save);

  return (
    <Button
      size="sm"
      variant="link"
      className={cn('h-7 gap-1 text-sm disabled:text-stone-400', saving && 'animate-spin')}
      disabled={saving}
      onClick={save}
    >
      <RefreshCw className="h-5.5 w-5.5" />
    </Button>
  );
};
