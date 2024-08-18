import MainLayout from '@/layouts/main-layout';
import { createRootRoute } from '@tanstack/react-router';

export const Route = createRootRoute({
  component: () => <MainLayout />,
});
