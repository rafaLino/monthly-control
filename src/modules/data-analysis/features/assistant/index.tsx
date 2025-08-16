import env from '@/lib/env';
import { useLocalParams } from '@/store';
import { AssistantDialog } from './assistantDialog';

export const Assistant = () => {
  const [enabledAssistant] = useLocalParams<boolean>('ai_assistant');

  if (!env.VITE_ONLINE || !enabledAssistant) return null;

  return <AssistantDialog />;
};
