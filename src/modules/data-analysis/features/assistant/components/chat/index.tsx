import { generateId } from '@/lib/utils';
import { useEffect, useState } from 'react';
import { Message } from '../../types/message';
import { useAssistant } from '../hooks/useAssistant';
import { MessageBox } from './message-box';
import { MessageInput } from './message-input';

export const Chat = () => {
  const { loading, responseMessage, withContext, resetMessage, sendMessage, setWithContext } = useAssistant();
  const [messages, setMessages] = useState<Array<Message>>([]);

  useEffect(() => {
    if (responseMessage.text) {
      setMessages((prev) => {
        const existedMessage = prev.find((msg) => msg.role === 'assistant' && msg.id === responseMessage.id);
        return existedMessage
          ? prev.map((item) => (item.id === responseMessage.id ? responseMessage : item))
          : prev.concat(responseMessage);
      });
    }
  }, [responseMessage, resetMessage]);

  const addMessage = async (value: string) => {
    const message: Message = { id: generateId(), role: 'user', text: value.trim() };
    setMessages((prev) => [...prev, message]);
    await sendMessage(message);
    resetMessage();
  };

  return (
    <div className="w-full h-full overflow-auto flex flex-col border rounded-lg shadow-md p-2 pb-0 bg-slate-100 dark:bg-slate-700 text-zinc-500">
      <MessageBox messages={messages} />
      <MessageInput
        loading={loading}
        attachmentEnabled={withContext}
        onInputValue={addMessage}
        onAttachmentChange={setWithContext}
      />
    </div>
  );
};
