import { z } from 'zod';
import { parseFirebaseConfig } from './parse-firebase-config';

const envSchema = z.object({
  MODE: z.string(),
  VITE_CLIENT_ID: z.string(),
  VITE_DOMAIN: z.string(),
  VITE_API_SECRET: z.string(),
  VITE_API_URL: z.string(),
  VITE_PARAMS_API_URL: z.string(),
  VITE_ONLINE: z
    .string()
    .nullish()
    .transform((val) => (val ? val === 'on' : true)),
  VITE_FIREBASE_CONFIG: z.string().nullish().transform(parseFirebaseConfig),
  VITE_FILES_URL: z.string(),
  VITE_WORKER_URL: z.string()
});

export default envSchema.parse(import.meta.env);
