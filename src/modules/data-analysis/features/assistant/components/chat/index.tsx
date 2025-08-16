import { useMessages } from '@/store';
import { useTranslation } from 'react-i18next';
import { useAssistant } from '../hooks/useAssistant';
import { MessageBox } from './message-box';
import { MessageInput } from './message-input';

export const Chat = () => {
  const { t } = useTranslation('translation', { keyPrefix: 'assistant' });
  const { loading, withContext, addMessage, setWithContext } = useAssistant();
  const messages = useMessages();

  return (
    <div className="w-full h-full overflow-auto flex flex-col border rounded-lg shadow-md p-2 pb-0 bg-slate-100 dark:bg-slate-700 text-zinc-500">
      <MessageBox messages={messages} />
      <MessageInput
        placeholder={t('inputPlaceholder')}
        loading={loading}
        attachmentEnabled={withContext}
        onInputValue={addMessage}
        onAttachmentChange={setWithContext}
      />
    </div>
  );
};
