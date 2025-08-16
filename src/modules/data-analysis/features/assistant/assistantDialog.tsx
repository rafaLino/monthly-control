import { Dialog, DialogContent, DialogDescription, DialogTitle } from '@/components/ui/dialog';
import { useKeyDown } from '@/hooks/useKeyDown';
import { Suspense, lazy, useState } from 'react';
import { useTranslation } from 'react-i18next';
import { ChatSkeleton } from './components/chat/chat-skeleton';
import { AssistantProvider } from './context/assistant-context';

const Chat = lazy(() => import('./components/chat').then((mod) => ({ default: mod.Chat })));

const disableClose = (event: Event) => event.preventDefault();

export const AssistantDialog = () => {
  const { t } = useTranslation('translation', { keyPrefix: 'assistant' });
  const [open, setOpen] = useState(false);

  useKeyDown('alt.a', () => {
    setOpen((prev) => !prev);
  });

  return (
    <Dialog open={open}>
      <DialogTitle hidden>{t('title')}</DialogTitle>
      <DialogDescription hidden>{t('description')}</DialogDescription>
      <DialogContent
        className="bg-background sm:max-w-7xl p-0 h-full sm:h-3/4 min-h-[80dvh]"
        onInteractOutside={disableClose}
        showClose={false}
      >
        <AssistantProvider>
          <Suspense fallback={<ChatSkeleton />}>
            <Chat />
          </Suspense>
        </AssistantProvider>
      </DialogContent>
    </Dialog>
  );
};
