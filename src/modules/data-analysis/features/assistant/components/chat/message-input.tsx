import { Button } from '@/components/ui/button';
import { Textarea } from '@/components/ui/textarea';
import { Toggle } from '@/components/ui/toggle';
import { Loader2Icon, Paperclip } from 'lucide-react';
import { FC, KeyboardEvent, memo, useRef } from 'react';

type ChatInputProps = {
  onInputValue: (value: string) => void;
  onAttachmentChange?: (pressed: boolean) => void;
  attachmentEnabled?: boolean;
  loading?: boolean;
};
export const MessageInput: FC<ChatInputProps> = memo(({ onInputValue, onAttachmentChange, attachmentEnabled, loading }) => {
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
        placeholder="Ask to assistant..."
        className="resize-none min-h-5 h-12 text-zinc-500 dark:text-zinc-100"
        onKeyDown={handleKeyDown}
      />

      {loading ? (
        <Button size="icon" variant="link" className="absolute right-3 bottom-3.5">
          <Loader2Icon className="h-4 w-4 animate-spin" />
        </Button>
      ) : (
        <Toggle
          aria-label="Toggle attachments"
          pressed={attachmentEnabled}
          className="absolute right-3 bottom-3.5"
          onPressedChange={onAttachmentChange}
        >
          <Paperclip className="h-4 w-4" />
        </Toggle>
      )}
    </div>
  );
});
