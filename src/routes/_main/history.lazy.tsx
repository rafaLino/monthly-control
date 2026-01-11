import { History } from '@/modules/history';
import { createLazyFileRoute } from '@tanstack/react-router';

export const Route = createLazyFileRoute('/_main/history')({
  component: History
});
