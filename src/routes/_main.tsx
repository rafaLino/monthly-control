import MainLayout from '@/layouts/main-layout';
import env from '@/lib/env';
import { useAuth0 } from '@auth0/auth0-react';
import { Navigate, createFileRoute } from '@tanstack/react-router';

const local = env.MODE === 'local';
console.log(env.MODE);
console.log(env.VITE_API_URL);
export const Route = createFileRoute('/_main')({
  component: local ? DockerIndex : Index,
});

function Index() {
  const { isAuthenticated, isLoading } = useAuth0();

  if (!isLoading && !isAuthenticated) {
    return <Navigate to='/login' replace={true} />;
  }

  return <MainLayout pageLoading={isLoading} />;
}

function DockerIndex() {
  return <MainLayout />;
}
