import { z } from 'zod';

export const Schema = z.object({
  default_waiting_time_for_generate_csv: z.coerce.number(),
  disable_automatic_download: z.coerce.boolean(),
  grid_col: z.coerce.number()
});

export type LocalParams = z.infer<typeof Schema>;

export type LocalParamsKeys = keyof LocalParams;

export const DEFAULT_LOCAL_PARAMS: LocalParams = {
  default_waiting_time_for_generate_csv: 10,
  disable_automatic_download: false,
  grid_col: 2
};
