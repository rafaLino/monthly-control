import { DotIndicator } from '@/components/dot-indicator/dot-indicator';
import { Button } from '@/components/ui/button';
import { Save } from 'lucide-react';
import { FC } from 'react';

export const Actions: FC<{
  unsaved?: boolean;
  saving?: boolean;
  onRefetch: () => void;
  onSave: () => void;
  onReset: () => void;
}> = ({ unsaved, saving, onRefetch, onSave, onReset }) => {
  return (
    <div className="flex justify-end gap-4 w-full">
      <Button variant="outline" onClick={onReset} className="cursor-pointer">
        Reset
      </Button>
      <Button variant="outline" onClick={onRefetch} className="cursor-pointer">
        Refetch
      </Button>
      <Button variant="default" className="relative gap-2 cursor-pointer" disabled={saving} onClick={onSave}>
        Save
        <Save className="size-4" />
        <DotIndicator active={unsaved} animate />
      </Button>
    </div>
  );
};
