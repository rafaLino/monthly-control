import env from '@/lib/env';
import { AssistantDialog } from './assistantDialog';
import { useLocalParams } from '@/store';

export const Assistant = () => {
  const [enabledAssistant] = useLocalParams<boolean>('ai_assistant');

  if (!env.VITE_ONLINE || !enabledAssistant) return null;

  return <AssistantDialog />;
};
