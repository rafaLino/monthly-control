import { RouterProvider, createRouter } from '@tanstack/react-router';

import { NotFound } from './layouts/not-found';
import { routeTree } from './routeTree.gen';

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
