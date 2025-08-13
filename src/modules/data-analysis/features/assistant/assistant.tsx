import { Dialog, DialogContent, DialogDescription, DialogTitle } from '@/components/ui/dialog';
import { useKeyDown } from '@/hooks/useKeyDown';
import env from '@/lib/env';
import { useState } from 'react';
import { Chat } from './components/chat';
import { AssistantProvider } from './context/assistant-context';

const disableClose = (event: Event) => event.preventDefault();

export const Assistant = () => {
  const [open, setOpen] = useState(false);

  useKeyDown('alt.a', () => {
    if (env.VITE_ONLINE) {
      setOpen((prev) => !prev);
    }
  });

  return (
    <AssistantProvider>
      <Dialog open={open} onOpenChange={setOpen}>
        <DialogTitle hidden>{'title'}</DialogTitle>
        <DialogDescription hidden>{'description'}</DialogDescription>
        <DialogContent
          className="bg-background sm:max-w-7xl p-0 h-full sm:h-3/4 min-h-[80dvh]"
          onInteractOutside={disableClose}
          showClose={false}
        >
          <Chat />
        </DialogContent>
      </Dialog>
    </AssistantProvider>
  );
};
