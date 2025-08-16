import { Tooltip, TooltipContent, TooltipProvider, TooltipTrigger } from '@/components/ui/tooltip';
import { Link } from '@tanstack/react-router';

export const TooltipLink: React.FC<React.ComponentPropsWithoutRef<typeof Link> & { tooltip: string }> = ({
  tooltip,
  children,
  hidden,
  ...props
}) => {
  return hidden ? null : (
    <TooltipProvider>
      <Tooltip>
        <TooltipTrigger asChild>
          <Link {...props}>{children}</Link>
        </TooltipTrigger>
        <TooltipContent side="right">{tooltip}</TooltipContent>
      </Tooltip>
    </TooltipProvider>
  );
};
