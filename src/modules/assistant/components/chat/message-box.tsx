import { FC, useEffect, useRef } from 'react';
import { Message } from '../../types/message';
import { cn } from '@/lib/utils';

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
    <section className="flex flex-col w-full h-[700px] rounded-lg bg-white px-2 py-4 gap-2 overflow-auto font-mono">
      {talks.map((talk) => (
        <p
          key={talk.id}
          className={cn('w-3/4 p-1 rounded-md', talk.role === 'user' ? 'bg-sky-100 self-end text-right' : 'bg-neutral-100')}
        >
          {talk.text}
        </p>
      ))}
      <i aria-label="endOfSection" ref={endOfSectionRef} />
    </section>
  );
};
