import { Dialog, DialogContent, DialogDescription, DialogTitle } from '@/components/ui/dialog';
import { useKeyDown } from '@/hooks/useKeyDown';
import { useState } from 'react';
import { useTranslation } from 'react-i18next';
import { ProjectionContent } from './components/projection-content';

export const ProjectionDialog = () => {
  const { t } = useTranslation('translation', { keyPrefix: 'projectionDialog' });
  const [open, setOpen] = useState(false);

  useKeyDown('alt.q', () => {
    setOpen((prev) => !prev);
  });

  const disableClose = (event: Event) => {
    event.preventDefault();
  };

  return (
    <Dialog open={open} onOpenChange={setOpen}>
      <DialogTitle hidden>{t('title')}</DialogTitle>
      <DialogDescription hidden>{t('description')}</DialogDescription>
      <DialogContent className="sm:max-w-7xl p-4 min-h-[80dvh] bg-zinc-100" onInteractOutside={disableClose}>
        <ProjectionContent />
      </DialogContent>
    </Dialog>
  );
};
