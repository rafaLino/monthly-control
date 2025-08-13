import { useCallback, useMemo, useState } from 'react';
import { useAssistantContext } from '../../context/useAssistantContext';
import { ChatSession } from 'firebase/ai';
import { Message } from '../../types/message';
import { generateId } from '@/lib/utils';
import { useQueryClient } from '@tanstack/react-query';
import { QueryKeys } from '@/types/queryKeys';

type STATUS = 'idle' | 'loading' | 'completed';
export function useAssistant() {
  const model = useAssistantContext();
  const [isStarted, setIsStarted] = useState<boolean>(false);
  const [error, setError] = useState<string>('');
  const [modelChat, setModelChat] = useState<ChatSession>();
  const [status, setStatus] = useState<STATUS>('idle');
  const [withContext, setWithContext] = useState<boolean>(false);
  const [responseMessage, setResponseMessage] = useState<Message>({ id: generateId(), role: 'assistant', text: '' });
  const queryClient = useQueryClient();

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
      try {
        const chat = getChat();
        const requestMessage = withContext
          ? [message.text, queryClient.getQueryData<{ csv: string }>([QueryKeys.generateMetadata])?.csv || '']
          : [message.text];

        const result = await chat.sendMessageStream(requestMessage);

        for await (const chunk of result.stream) {
          setResponseMessage((prev) => ({ ...prev, text: `${prev.text} ${chunk.text()}` }));
        }
      } catch (error) {
        if (error instanceof Error) {
          setError(error.message);
        }
      } finally {
        setStatus('completed');
      }
    },
    [getChat, withContext]
  );

  const resetMessage = useCallback(() => {
    setResponseMessage({ id: generateId(), role: 'assistant', text: '' });
  }, []);

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
    setWithContext,
    resetMessage,
    responseMessage,
    withContext,
    ...statusValue
  };
}
