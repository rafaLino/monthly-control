import env from '@/lib/env';
import { getParam } from '@/store';
import { createFileRoute, notFound } from '@tanstack/react-router';

export const Route = createFileRoute('/_main/transactions')({
  beforeLoad: () => {
    if (!env.VITE_ONLINE || !getParam('transactions')) {
      throw notFound();
    }
  }
});
