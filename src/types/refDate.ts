import { z } from 'zod';

export const RefDateSchema = z.string().regex(/^\d{4}-(0[1-9]|1[0-2])$/);

export type TRefDate = z.infer<typeof RefDateSchema>;

export type FileReponseData = {
  ref: TRefDate;
  created_at: string;
};
