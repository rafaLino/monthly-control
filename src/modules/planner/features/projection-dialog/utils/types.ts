export type Column = {
  id: string;
  name: string;
  value: number;
};

export type Feature = {
  id: string;
  name: string;
  column: string;
  color: string;
  value: number;
};
