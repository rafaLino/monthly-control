import { cn } from '@/lib/utils';
import { ArrowDown, ArrowUp } from 'lucide-react';
import { ComponentProps, FC, startTransition, useEffect, useEffectEvent, useRef, useState } from 'react';
import { Button } from '../ui/button';
import { ScrollArea } from '../ui/scroll-area';

export const NavigationScrollArea: FC<ComponentProps<typeof ScrollArea>> = ({ children, ...props }) => {
  const endOfSectionRef = useRef<HTMLElement>(null);
  const startOfSectionRef = useRef<HTMLElement>(null);
  const scrollAreaRef = useRef<HTMLDivElement>(null);
  const [direction, setDirection] = useState<'up' | 'down'>('down');

  const handleScroll = useEffectEvent(() => {
    if (!endOfSectionRef.current || !startOfSectionRef.current) return;
    const offset =
      window.innerHeight -
      startOfSectionRef.current.getBoundingClientRect().top -
      endOfSectionRef.current.getBoundingClientRect().top;

    const direction = offset > 0 ? 'up' : 'down';
    startTransition(() => {
      setDirection(direction);
    });
  });

  const handleMove = () => {
    if (!endOfSectionRef.current || !startOfSectionRef.current) return;

    if (direction === 'up') {
      startOfSectionRef.current.scrollIntoView({ behavior: 'smooth' });
    } else {
      endOfSectionRef.current.scrollIntoView({ behavior: 'smooth' });
    }
  };

  useEffect(() => {
    scrollAreaRef.current?.addEventListener('scrollend', handleScroll, true);

    return () => {
      scrollAreaRef.current?.removeEventListener('scrollend', handleScroll, true);
    };
  }, []);

  return (
    <>
      <Button
        type="button"
        variant="outline"
        size="icon"
        className={cn('rounded-full size-12 cursor-pointer fixed bottom-1 right-1 sm:bottom-10 sm:right-10 z-30')}
        onClick={handleMove}
      >
        {direction === 'up' ? (
          <ArrowUp className="size-4 animate-in spin-in" />
        ) : (
          <ArrowDown className="size-4 animate-in spin-in" />
        )}
      </Button>
      <ScrollArea ref={scrollAreaRef} {...props}>
        <i aria-label="startOfSection" ref={startOfSectionRef} />
        {children}
        <i aria-label="endOfSection" ref={endOfSectionRef} />
      </ScrollArea>
    </>
  );
};
