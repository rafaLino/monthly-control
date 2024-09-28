import { z } from 'zod';


const envSchema = z.object({
  VITE_CLIENT_ID: z.string(),
  VITE_DOMAIN: z.string(),
  VITE_API_SECRET: z.string(),
  VITE_API_URL: z.string(),
  VITE_PARAMS_API_URL: z.string(),
  VITE_AUTH: z.string().nullish().transform((val) => (val ? val === 'on' : true)),
});

export default envSchema.parse(import.meta.env);
