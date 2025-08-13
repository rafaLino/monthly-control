import { cn } from '@/lib/utils';
import { FC, useEffect, useRef } from 'react';
import Markdown from 'react-markdown';
import { Message } from '../../types/message';
type MessageBoxProps = {
  messages: Array<Message>;
};

export const MessageBox: FC<MessageBoxProps> = ({ messages: talks }) => {
  const endOfSectionRef = useRef<HTMLElement>(null);
  useEffect(() => {
    if (talks.length > 0) {
      endOfSectionRef.current?.scrollIntoView({ behavior: 'smooth' });
    }
  }, [talks.length]);
  return (
    <section className="flex flex-col w-full h-full rounded-lg bg-background px-2 py-4 gap-2 overflow-auto font-mono dark:text-zinc-100">
      {talks.map((talk) => (
        <div
          key={talk.id}
          className={cn(
            'w-3/4 p-1 rounded-md px-3',
            talk.role === 'user' ? 'bg-sky-100 dark:bg-sky-800 self-end text-right' : 'bg-neutral-100 dark:bg-neutral-700'
          )}
        >
          <Markdown>{talk.text}</Markdown>
        </div>
      ))}
      <i aria-label="endOfSection" ref={endOfSectionRef} />
    </section>
  );
};
