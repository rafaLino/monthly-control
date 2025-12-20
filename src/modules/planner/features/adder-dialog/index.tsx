import { Dialog, DialogContent, DialogDescription, DialogTitle } from '@/components/ui/dialog';
import { useKeyDown } from '@/hooks/useKeyDown';
import { Suspense, lazy, useState } from 'react';
import { useTranslation } from 'react-i18next';

const AdderContent = lazy(() =>
  import('./components/adder-content').then((module) => ({ default: module.AdderContent }))
);

const disableClose = (event: Event) => event.preventDefault();

export const AdderDialog = () => {
  const { t } = useTranslation('translation', { keyPrefix: 'projectionDialog' });
  const [open, setOpen] = useState(false);

  useKeyDown('alt.w', () => {
    setOpen((prev) => !prev);
  });

  return (
    <Dialog open={open} onOpenChange={setOpen}>
      <DialogTitle hidden>{t('title')}</DialogTitle>
      <DialogDescription hidden>{t('description')}</DialogDescription>
      <DialogContent
        className="bg-background overflow-auto p-0 h-screen w-full max-w-screen"
        onInteractOutside={disableClose}
        showClose={false}
      >
        <Suspense fallback="...loading">
          <AdderContent onClose={() => setOpen(false)} />
        </Suspense>
      </DialogContent>
    </Dialog>
  );
};
