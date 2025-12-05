import { Input } from '@/components/ui/input';
import { cn } from '@/lib/utils';
import { Search } from 'lucide-react';
import { ComponentPropsWithoutRef, forwardRef } from 'react';

type SearchInputProps = ComponentPropsWithoutRef<'input'>;
export const SearchInput = forwardRef<HTMLInputElement, SearchInputProps>(({ className, ...props }, ref) => {
  return (
    <div className={cn('relative flex md:grow-0 order-3 w-full sm:w-auto text-center', className)}>
      <Search className="absolute left-2.5 top-3 h-4 w-4 text-muted-foreground" />
      <Input ref={ref} className="w-full rounded-lg bg-background pl-8 md:w-[200px] lg:w-[336px]" {...props} />
    </div>
  );
});
