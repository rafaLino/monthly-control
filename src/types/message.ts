export type MessageRole = 'user' | 'assistant' | 'system' | 'error';
export interface Message {
  role: MessageRole;
  text: string;
  id: string;
}

export type MessageInput = {
  role: MessageRole;
  text: string;
};
