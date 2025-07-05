import { z } from 'zod';

const envSchema = z.object({
  VITE_CLIENT_ID: z.string(),
  VITE_DOMAIN: z.string(),
  VITE_API_SECRET: z.string(),
  VITE_API_URL: z.string(),
  VITE_PARAMS_API_URL: z.string(),
  VITE_ONLINE: z
    .string()
    .nullish()
    .transform((val) => (val ? val === 'on' : true)),
  VITE_FIREBASE_CONFIG: z
    .string()
    .nullish()
    .transform((val) => {
      if (!val) return null;
      const values = val.split(',');
      return {
        apiKey: values[0],
        authDomain: values[1],
        projectId: values[2],
        storageBucket: values[3],
        messagingSenderId: values[4],
        appId: values[5]
      };
    }),
  VITE_AI_MODEL: z.string().optional()
});

export default envSchema.parse(import.meta.env);
