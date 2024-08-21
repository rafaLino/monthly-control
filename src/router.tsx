import { createRouter, RouterProvider } from '@tanstack/react-router';

import { routeTree } from './routeTree.gen';
import { useAuth0 } from '@auth0/auth0-react';

declare module '@tanstack/react-router' {
  interface Register {
    router: typeof router;
  }
}
const router = createRouter({
  routeTree,
  context: {
    auth: undefined!,
  },
});

export function AppRoute() {
  const { isAuthenticated, isLoading } = useAuth0();
  return <RouterProvider router={router} context={{ auth: { isAuthenticated, isLoading } }} />;
}
