import placeholderUser from '@/assets/placeholder-user.jpg';
import env from '@/lib/env';
import { cn } from '@/lib/utils';
import { LoaderCircle } from 'lucide-react';
import { ComponentPropsWithoutRef, ForwardRefExoticComponent, forwardRef, useState } from 'react';
import { Button } from '../ui/button';
type ThumbnailProps = ComponentPropsWithoutRef<'button'> & {
  src: string | undefined;
};
export const Thumbnail: ForwardRefExoticComponent<ThumbnailProps> = forwardRef<HTMLButtonElement, ThumbnailProps>(
  ({ src, ...props }, ref) => {
    const [loaded, setLoaded] = useState(false);
    return (
      <Button
        ref={ref}
        {...props}
        variant="outline"
        size="icon"
        className="overflow-hidden rounded-full focus-visible:ring-inset"
      >
        <img
          src={env.VITE_AUTH ? src : placeholderUser}
          width={36}
          height={36}
          alt="Avatar"
          className={cn('overflow-hidden rounded-full', loaded ? 'block' : 'hidden')}
          onLoad={() => setLoaded(true)}
        />
        {loaded ? null : <LoaderCircle className="text-neutral-200 animate-spin" />}
      </Button>
    );
  }
);
