import { Dialog, DialogContent, DialogDescription, DialogTitle } from '@/components/ui/dialog';
import { useKeyDown } from '@/hooks/useKeyDown';
import { useState } from 'react';
import { useTranslation } from 'react-i18next';
import { ProjectionContent } from './components/projection-contentV2';

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
        className="bg-background overflow-auto sm:max-w-7xl p-4 h-full sm:h-3/4 min-h-[80dvh] "
        onInteractOutside={disableClose}
        showClose={false}
      >
        <ProjectionContent />
      </DialogContent>
    </Dialog>
  );
};
