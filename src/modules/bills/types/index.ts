export type Bill = {
  id: string;
  title: string;
  amount: number;
  tags: string[];
};

export type User = {
  id: string;
  name: string;
  amount: number;
};

export type Status = 'idle' | 'success' | 'error';
