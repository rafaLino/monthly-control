import { Textarea } from '@/components/ui/textarea';
import { FC, KeyboardEvent, memo, useRef } from 'react';

type ChatInputProps = {
  onInputValue: (value: string) => void;
};
export const MessageInput: FC<ChatInputProps> = memo(({ onInputValue }) => {
  const inputRef = useRef<HTMLTextAreaElement>(null);

  const handleKeyDown = (event: KeyboardEvent) => {
    if (event.key === 'Enter' && !event.shiftKey) {
      event.preventDefault();
      if (inputRef.current) {
        onInputValue(inputRef.current.value);
        inputRef.current.value = '';
      }
    }
  };

  return (
    <div className="my-2">
      <Textarea
        ref={inputRef}
        placeholder="Ask assistant..."
        className="resize-none min-h-5 h-12 text-zinc-500"
        onKeyDown={handleKeyDown}
      />
    </div>
  );
});
