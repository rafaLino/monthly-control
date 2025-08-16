import env from '@/lib/env';
import { z } from 'zod';

export const Schema = z.object({
  default_waiting_time_for_generate_csv: z.coerce.number(),
  disable_automatic_download: z.coerce.boolean(),
  grid_col: z.coerce.number(),
  ai_assistant: z.coerce.boolean(),
  ai_model: z.string().optional()
});

export type LocalParams = z.infer<typeof Schema>;

export type LocalParamsKeys = keyof LocalParams;

export const DEFAULT_LOCAL_PARAMS: LocalParams = {
  default_waiting_time_for_generate_csv: 10,
  disable_automatic_download: !env.VITE_ONLINE,
  grid_col: 2,
  ai_assistant: false,
  ai_model: 'gemini-2.5-flash'
};
