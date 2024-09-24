import { Button } from '@/components/ui/button';
import { Popover, PopoverContent, PopoverTrigger } from '@/components/ui/popover';
import { Textarea } from '@/components/ui/textarea';
import { cn } from '@/lib/utils';
import { ExtractionLog } from '@/types/extraction-log.types';
import { ChangeEvent, FC, KeyboardEvent, MouseEvent, memo, useState } from 'react';
import { useTranslation } from 'react-i18next';

type LogItemProps = {
  log: ExtractionLog;
  onChange: (id: string, notes: string) => void;
};

export const LogItem: FC<LogItemProps> = memo(({ log, onChange }) => {
  const { t } = useTranslation();
  const [notes, setNotes] = useState(log.notes);
  const [opened, setOpened] = useState(false);

  const save = () => {
    onChange(log.id, notes);
    setOpened(false);
  };

  const handleNotesChange = (event: ChangeEvent<HTMLTextAreaElement>) => {
    setNotes(event.target.value);
  };

  const handleKeyDown = (event: KeyboardEvent<HTMLTextAreaElement>) => {
    if (event.key === 'Enter' && !(event.shiftKey || event.ctrlKey)) {
      save();
    }
  };

  const handleOpenChange = (value: boolean) => {
    setOpened(value);
  };

  const handleSaveClick = (event: MouseEvent<HTMLButtonElement>) => {
    event.preventDefault();
    save();
  };

  return (
    <Popover onOpenChange={handleOpenChange} open={opened}>
      <PopoverTrigger asChild>
        <Button variant="link" aria-selected={opened} className={cn(opened && 'font-bold')}>
          <span className="text-sm">{t('date', { date: log.createdAt, context: { format: 'Ppaa' } })}</span>
        </Button>
      </PopoverTrigger>
      <PopoverContent>
        <div className="flex flex-col gap-3">
          <Textarea rows={10} value={notes} onChange={handleNotesChange} onKeyDown={handleKeyDown} />
          <div className="flex justify-end">
            <Button onClick={handleSaveClick}>{t('logs.save')}</Button>
          </div>
        </div>
      </PopoverContent>
    </Popover>
  );
});
LogItem.displayName = 'LogItem';
