import { Dialog, DialogContent, DialogDescription, DialogTitle } from '@/components/ui/dialog';
import { useKeyDown } from '@/hooks/useKeyDown';
import { Suspense, lazy, useState } from 'react';
import { AdderSkeleton } from './components/adder-content-skeleton';

const AdderContent = lazy(() =>
  import('./components/adder-content').then((module) => ({ default: module.AdderContent }))
);

const disableClose = (event: Event) => event.preventDefault();

export const AdderDialog = () => {
  const [open, setOpen] = useState(false);

  useKeyDown('alt.w', () => {
    setOpen((prev) => !prev);
  });

  return (
    <Dialog open={open} onOpenChange={setOpen}>
      <DialogTitle hidden>adder dialog</DialogTitle>
      <DialogDescription hidden>Sum your records</DialogDescription>
      <DialogContent
        className="bg-background overflow-auto p-0 h-screen w-full max-w-screen sm:h-1/2 sm:w-3/4"
        onInteractOutside={disableClose}
        showClose={true}
      >

        <Suspense fallback={<AdderSkeleton />}>
          <AdderContent />
        </Suspense>
      </DialogContent>
    </Dialog>
  );
};
