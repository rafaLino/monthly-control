import { Button } from '@/components/ui/button';
import { cn } from '@/lib/utils';
import { FileDown, HardDriveDownload, LoaderCircleIcon } from 'lucide-react';
import { FC, memo } from 'react';

type Props = {
  fetching: boolean;
  title?: string;
  isSuccess?: boolean;
  onClick: () => void;
  onSaveFile?: () => void;
};
export const DownloadButton: FC<Props> = memo(({ fetching, isSuccess, onClick, onSaveFile, title = 'Download' }) => {
  const handleClick = () => onClick();
  return (
    <div className="flex gap-1">
      {isSuccess && (
        <Button variant="ghost" size="icon" onClick={onSaveFile} className="hidden sm:block">
          <FileDown className="h-4 w-4" />
        </Button>
      )}
      <Button
        variant={fetching ? 'destructive' : 'outline'}
        size="default"
        className={cn('flex items-center gap-2', fetching && 'opacity-75')}
        onClick={handleClick}
      >
        <span className="hidden sm:block">{title}</span>
        {fetching ? <LoaderCircleIcon className="h-4 w-4 animate-spin" /> : <HardDriveDownload className="h-4 w-4" />}
      </Button>
    </div>
  );
});
