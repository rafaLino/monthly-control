import { ComponentPropsWithoutRef, ReactNode, useEffect, useRef } from 'react';
import { Swapy, createSwapy } from 'swapy';

type Props<T> = Omit<ComponentPropsWithoutRef<'div'>, 'children'> & {
  children?: ((item: T) => ReactNode) | ReactNode;
  data: Array<T>;
  swapyKey: keyof T;
};
export const SwapContainer = <T,>({ data, children, swapyKey, ...props }: Readonly<Props<T>>) => {
  const swapyRef = useRef<Swapy | null>(null);
  const containerRef = useRef<HTMLDivElement>(null);

  useEffect(() => {
    if (!containerRef.current) {
      return;
    }
    swapyRef.current = createSwapy(containerRef.current);

    return () => {
      swapyRef.current?.destroy();
    };
  }, []);

  return (
    <div ref={containerRef} {...props}>
      {data.map((item) => (
        <div key={item[swapyKey] as string} data-swapy-slot={item[swapyKey]}>
          <div key={item[swapyKey] as string} data-swapy-item={item[swapyKey]} className='h-full'>
            {typeof children === 'function' ? children(item) : children}
          </div>
        </div>
      ))}
    </div>
  );
};
