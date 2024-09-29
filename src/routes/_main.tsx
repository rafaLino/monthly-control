import MainLayout from '@/layouts/main-layout';
import env from '@/lib/env';
import { useAuth0 } from '@auth0/auth0-react';
import { Navigate, createFileRoute } from '@tanstack/react-router';

export const Route = createFileRoute('/_main')({
  component: env.VITE_AUTH ? Index : NoAuthIndex
});

function Index() {
  const { isAuthenticated, isLoading } = useAuth0();

  if (!isLoading && !isAuthenticated) {
    return <Navigate to="/login" replace={true} />;
  }

  return <MainLayout pageLoading={isLoading} />;
}

function NoAuthIndex() {
  return <MainLayout />;
}
