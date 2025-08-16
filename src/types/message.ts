export interface Message {
  role: 'user' | 'assistant';
  text: string;
  id: string;
}

export type MessageInput = {
  role: 'user' | 'assistant';
  text: string;
};
