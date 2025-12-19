import { RouterProvider, createRouter } from '@tanstack/react-router';

import { routeTree } from './routeTree.gen';
import { NotFound } from './layouts/not-found';

declare module '@tanstack/react-router' {
  interface Register {
    router: typeof router;
  }
}
const router = createRouter({ 
  routeTree,
  defaultNotFoundComponent: NotFound
});

export function AppRoute() {
  return <RouterProvider router={router} />;
}
