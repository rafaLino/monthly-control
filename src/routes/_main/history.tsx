import env from '@/lib/env';
import { createFileRoute, notFound } from '@tanstack/react-router';
import { z } from 'zod';
export const Route = createFileRoute('/_main/history')({
  beforeLoad: () => {
    if (!env.VITE_ONLINE) {
      throw notFound();
    }
  },
  validateSearch: z.object({
    ref: z.string().optional()
  })
});
