import { z } from 'zod';

const envSchema = z.object({
    VITE_CLIENT_ID: z.string(),
    VITE_DOMAIN: z.string(),
    VITE_CALLBACK_URL: z.string(),
});

export default envSchema.parse(import.meta.env);
