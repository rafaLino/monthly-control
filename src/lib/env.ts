import { z } from 'zod';

const envSchema = z.object({
  VITE_CLIENT_ID: z.string(),
  VITE_DOMAIN: z.string(),
  VITE_API_SECRET: z.string(),
  VITE_API_URL: z.string(),
  VITE_AMQP_URL: z.string(),
  VITE_AMQP_VHOST: z.string(),
  VITE_AMQP_USER: z.string(),
  VITE_AMQP_PASSWORD: z.string(),
  VITE_PARAMS_API_URL: z.string(),
});

export default envSchema.parse(import.meta.env);
