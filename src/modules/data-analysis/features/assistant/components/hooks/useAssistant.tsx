import { generateId } from '@/lib/utils';
import { useChatSession, useSetMessages } from '@/store';
import { QueryKeys } from '@/types/queryKeys';
import { useQueryClient } from '@tanstack/react-query';
import { useCallback, useMemo, useState } from 'react';
import { useTranslation } from 'react-i18next';
import { useAssistantContext } from '../../context/useAssistantContext';
import { COMMANDS } from '../../types/commands';

type STATUS = 'idle' | 'loading' | 'completed';
export function useAssistant() {
  const { t } = useTranslation('translation', { keyPrefix: 'assistant' });
  const model = useAssistantContext();

  const [chat, setChat] = useChatSession();
  const [status, setStatus] = useState<STATUS>('idle');
  const [withContext, setWithContext] = useState<boolean>(false);
  const { setMessages, clearMessages } = useSetMessages();
  const queryClient = useQueryClient();

  const getChat = useCallback(() => {
    if (chat) return chat;

    if (!model) {
      throw new Error('Assistant model is not initialized');
    }
    const newChat = model.startChat();
    setChat(newChat);
    return newChat;
  }, [chat, model]);

  const sendMessage = useCallback(
    async (text: string) => {
      setStatus('loading');

      try {
        const chat = getChat();
        const requestMessage = withContext
          ? [queryClient.getQueryData<{ csv: string }>([QueryKeys.generateMetadata])?.csv || '', text]
          : [text];

        const result = await chat.sendMessageStream(requestMessage);
        const id = generateId();
        for await (const chunk of result.stream) {
          setMessages(id, { text: chunk.text(), role: 'assistant' });
        }
      } catch (error) {
        if (error instanceof Error) {
          setMessages(generateId(), {
            text: error.message,
            role: 'error'
          });
        }
      } finally {
        setStatus('completed');
      }
    },
    [getChat, withContext]
  );

  const addMessage = useCallback(
    async (value: string) => {
      if (value.startsWith('/')) {
        handleCommand(value);
        return;
      }
      const text = value.trim();
      setMessages(generateId(), { text, role: 'user' });
      await sendMessage(text);
    },
    [sendMessage, setMessages]
  );

  const handleCommand = useCallback(
    (value: string) => {
      switch (value.trim()) {
        case COMMANDS.clear:
          clearMessages();
          break;
        case COMMANDS.exit:
          setChat(undefined);
          break;
        case COMMANDS.help: {
          setMessages(generateId(), {
            role: 'system',
            text: t('commands')
          });
          break;
        }
      }
    },
    [setMessages]
  );

  const statusValue = useMemo(() => {
    return {
      loading: status === 'loading',
      completed: status === 'completed'
    };
  }, [status]);

  return {
    ...statusValue,
    status,
    withContext,
    setWithContext,
    addMessage
  };
}
