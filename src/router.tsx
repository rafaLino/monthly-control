import { createRouter, RouterProvider } from '@tanstack/react-router';

import { routeTree } from './routeTree.gen';

declare module '@tanstack/react-router' {
  interface Register {
    router: typeof router;
  }
}
const router = createRouter({ routeTree });

export function AppRoute() {
  return <RouterProvider router={router} />;
}
