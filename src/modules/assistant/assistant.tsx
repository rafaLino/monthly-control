import { Chat } from './components/chat';
import { AssistantProvider } from './context/assistant-context';

export const Assistant = () => {
  return (
    <AssistantProvider>
      <Chat />
    </AssistantProvider>
  );
};
