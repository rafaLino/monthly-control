import { Dialog, DialogContent, DialogDescription, DialogTitle } from '@/components/ui/dialog';
import { useKeyDown } from '@/hooks/useKeyDown';
import { lazy, Suspense, useState } from 'react';
import { useTranslation } from 'react-i18next';
import { ProjectionSkeleton } from './components/projection-skeleton';

const ProjectionContent = lazy(() => import('./components/projection-content').then(module => ({ default: module.ProjectionContent })))

const disableClose = (event: Event) => event.preventDefault();

export const ProjectionDialog = () => {
  const { t } = useTranslation('translation', { keyPrefix: 'projectionDialog' });
  const [open, setOpen] = useState(false);

  useKeyDown('alt.q', () => {
    setOpen((prev) => !prev);
  });

  return (
    <Dialog open={open} onOpenChange={setOpen}>
      <DialogTitle hidden>{t('title')}</DialogTitle>
      <DialogDescription hidden>{t('description')}</DialogDescription>
      <DialogContent
        className="bg-background overflow-auto p-4 h-screen w-full max-w-screen"
        onInteractOutside={disableClose}
        showClose={false}
      >
        <Suspense fallback={<ProjectionSkeleton />}>
          <ProjectionContent />
        </Suspense>
      </DialogContent>
    </Dialog>
  );
};