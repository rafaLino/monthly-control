import { cn } from '@/lib/utils';
import { Message, MessageRole } from '@/types/message';
import { Bomb, BotIcon, UserCircle2Icon, Wrench } from 'lucide-react';
import { FC, JSX, memo, useEffect, useRef } from 'react';
import Markdown from 'react-markdown';

type MessageBoxProps = {
  messages: Array<Message>;
};

export const MessageBox: FC<MessageBoxProps> = memo(({ messages }) => {
  const endOfSectionRef = useRef<HTMLElement>(null);
  useEffect(() => {
    if (messages.length > 0) {
      endOfSectionRef.current?.scrollIntoView({ behavior: 'smooth' });
    }
  }, [messages.length]);

  return (
    <section className="flex flex-col w-full h-full rounded-lg bg-background p-2 sm:p-4 gap-2 overflow-auto dark:text-zinc-100">
      {messages.map(({ id, role, text }) => (
        <MessageContent key={id} role={role} content={text} />
      ))}
      <i aria-label="endOfSection" ref={endOfSectionRef} />
    </section>
  );
});
MessageBox.displayName = 'MessageBox';

const MessageContent: FC<{ role: MessageRole; content: string }> = memo(({ role, content }) => {
  const isUser = role === 'user';

  return (
    <div className={cn('flex gap-2 items-center', isUser && 'self-end', role === 'assistant' && 'w-full')}>
      <MessageIcon role={role} show={!isUser} />
      <div
        className={cn(
          'flex flex-col rounded-xl p-3 w-full text-zinc-500 dark:text-current',
          isUser && 'bg-neutral-100 dark:bg-gray-700 text-end',
          role === 'system' && 'text-green-700 bg-green-100 dark:text-green-800',
          role === 'error' && 'text-red-700 bg-red-100 dark:text-red-800'
        )}
      >
        {isUser ? <div>{content}</div> : <Markdown>{content}</Markdown>}
      </div>
      <MessageIcon role={role} show={isUser} />
    </div>
  );
});
MessageContent.displayName = 'MessageContent';

const ICONS: Record<MessageRole, JSX.Element> = {
  user: <UserCircle2Icon />,
  assistant: <BotIcon />,
  system: <Wrench />,
  error: <Bomb />
};

const getColor = (role: MessageRole): string => {
  switch (role) {
    case 'user':
      return 'text-sky-700 bg-sky-100';
    case 'assistant':
      return 'text-orange-700 bg-orange-100';
    case 'system':
      return 'text-green-700 bg-green-100';
    case 'error':
      return 'text-red-700 bg-red-100';
    default:
      return 'bg-neutral-100 dark:bg-gray-700';
  }
};
const MessageIcon: FC<{ role: MessageRole; show: boolean }> = memo(({ role, show }) => {
  return show ? <div className={cn('rounded-full p-2 hidden sm:block', getColor(role))}>{ICONS[role]}</div> : null;
});
MessageIcon.displayName = 'MessageIcon';
