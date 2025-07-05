export interface Message {
  role: 'user' | 'assistant';
  text: string;
  id: string;
}
