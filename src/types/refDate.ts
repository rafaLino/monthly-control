import { z } from 'zod';

export const RefDateSchema = z.string().regex(/^\d{4}-([1-9]|[01]\d|1[0-2])$/);

export type TRefDate = z.infer<typeof RefDateSchema>;

export type FileReponseData = {
  ref: TRefDate;
  created_at: string;
};
