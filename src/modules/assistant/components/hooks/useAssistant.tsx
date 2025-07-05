import { useCallback, useMemo, useState } from 'react';
import { useAssistantContext } from '../../context/useAssistantContext';
import { ChatSession } from 'firebase/ai';
import { Message } from '../../types/message';
import { generateId } from '@/lib/utils';

type STATUS = 'idle' | 'loading' | 'completed';
export function useAssistant() {
  const [isStarted, setIsStarted] = useState<boolean>(false);
  const [error, setError] = useState<string>('');
  const { model } = useAssistantContext();
  const [modelChat, setModelChat] = useState<ChatSession>();
  const [status, setStatus] = useState<STATUS>('idle');

  const getChat = useCallback(() => {
    if (isStarted) return modelChat!;

    const newChat = model.startChat();
    setModelChat(newChat);
    setIsStarted(true);
    return newChat;
  }, [modelChat, model]);

  const sendMessage = useCallback(
    async (message: Message) => {
      setStatus('loading');
      const baseMessage: Message = { id: generateId(), role: 'assistant', text: '' };
      try {
        const chat = getChat();
        // const { totalTokens, promptTokensDetails } = await model.countTokens('Write a story about a magic backpack.');
        // console.log(`Total tokens: ${totalTokens}, total billable characters: ${JSON.stringify(promptTokensDetails)}`);
        const result = await chat.sendMessage(message.text);
        const text = result.response.text();
        // console.log(text);
        return { ...baseMessage, text };
      } catch (error) {
        if (error instanceof Error) {
          setError(error.message);
        }
      } finally {
        setStatus('completed');
      }
    },
    [getChat]
  );

  const statusValue = useMemo(() => {
    return {
      loading: status === 'loading',
      completed: status === 'completed'
    };
  }, [status]);

  return {
    error,
    status,
    sendMessage,
    ...statusValue
  };
}
