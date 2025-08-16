import { useContext } from 'react';
import { AssistantContext } from './assistant-context';

export const useAssistantContext = () => {
  const context = useContext(AssistantContext);
  return context;
};
