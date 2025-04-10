import { Button } from '@/components/ui/button';
import { Tooltip, TooltipContent, TooltipProvider, TooltipTrigger } from '@/components/ui/tooltip';
import { OctagonX } from 'lucide-react';
import { FC } from 'react';

type Props = {
  onClick?: () => void;
  helperText: string;
};

export const ClearDataButton: FC<Props> = ({ helperText, onClick }) => {
  return (
    <TooltipProvider>
      <Tooltip >
        <TooltipTrigger asChild>
          <Button variant='destructive' size='icon' onClick={onClick}>
            <OctagonX className='w-4 h-4' />
          </Button>
        </TooltipTrigger>
        <TooltipContent side='bottom' align='start' className='shadow-lg rounded-lg'>
          {helperText}
        </TooltipContent>
      </Tooltip>
    </TooltipProvider>
  );
};
