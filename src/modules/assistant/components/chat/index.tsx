import { generateId } from '@/lib/utils';
import { useState } from 'react';
import { Message } from '../../types/message';
import { useAssistant } from '../hooks/useAssistant';
import { MessageBox } from './message-box';
import { MessageInput } from './message-input';

export const Chat = () => {
  const { loading, sendMessage } = useAssistant();
  const [messages, setMessages] = useState<Array<Message>>([]);

  const addMessage = async (value: string) => {
    const message: Message = { id: generateId(), role: 'user', text: value.trim() };
    setMessages((prev) => [...prev, message]);
    const responseMessage = await sendMessage(message);
    if (responseMessage) setMessages((prev) => [...prev, responseMessage]);
  };

  return (
    <div className="w-full h-full min-h-screen flex flex-col border rounded-lg shadow-md p-2 pb-0 bg-slate-100 text-zinc-500">
      <MessageBox messages={messages} />
      <MessageInput onInputValue={addMessage} />
    </div>
  );
};
