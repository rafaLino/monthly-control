import { Button } from '@/components/ui/button';
import { cn } from '@/lib/utils';
import { HardDriveDownload, LoaderCircleIcon } from 'lucide-react';
import { FC, memo } from 'react';

type Props = {
  fetching: boolean;
  title?: string;
  onClick: () => void;
};
export const DownloadButton: FC<Props> = memo(({ fetching, onClick, title = 'Donwload' }) => {
  const handleClick = () => onClick();
  return (
    <Button
      variant={fetching ? 'destructive' : 'outline'}
      size='default'
      className={cn('flex items-center gap-2', fetching && 'opacity-75')}
      onClick={handleClick}
    >
      {title}
      {fetching ? <LoaderCircleIcon className='h-4 w-4 animate-spin' /> : <HardDriveDownload className='h-4 w-4' />}
    </Button>
  );
});
