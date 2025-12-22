import { Dialog, DialogContent, DialogDescription, DialogTitle } from '@/components/ui/dialog';
import { useKeyDown } from '@/hooks/useKeyDown';
import { FC, RefObject, Suspense, lazy, useImperativeHandle, useState } from 'react';
import { AdderSkeleton } from './components/adder-content-skeleton';

const AdderContent = lazy(() => import('./components/adder-content').then((module) => ({ default: module.AdderContent })));

const disableClose = (event: Event) => event.preventDefault();

export type AdderDialogRef = {
  openDialog: () => void;
};

export const AdderDialog: FC<{
  dialogRef: RefObject<AdderDialogRef | null>;
}> = ({ dialogRef }) => {
  const [open, setOpen] = useState(false);

  useImperativeHandle(dialogRef, () => {
    return {
      openDialog: () => {
        setOpen(true);
      }
    };
  });

  useKeyDown('alt.c', () => {
    setOpen((prev) => !prev);
  });

  return (
    <Dialog open={open} onOpenChange={setOpen}>
      <DialogTitle hidden>Adder dialog</DialogTitle>
      <DialogDescription hidden>Sum your records</DialogDescription>
      <DialogContent
        className="bg-background overflow-auto p-0 h-screen w-full max-w-screen sm:h-3/4 sm:w-3/4"
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
