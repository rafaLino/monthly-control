import MainLayout from '@/layouts/main-layout';
import { createFileRoute, redirect } from '@tanstack/react-router';

export const Route = createFileRoute('/_main')({
  component: MainLayout,
  beforeLoad: ({ context }) => {
    if (context.auth.isLoading) {
      return context.auth.isLoading;
    }
    if (!context.auth.isAuthenticated) {
      throw redirect({
        to: '/login',
        replace: true,
      });
    }
  },
});
