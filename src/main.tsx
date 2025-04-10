import { QueryClient } from '@tanstack/react-query';
import { PersistQueryClientProvider } from '@tanstack/react-query-persist-client';
import { StrictMode } from 'react';
import { createRoot } from 'react-dom/client';
import { AuthProvider } from './auth-provider';
import { createIDBPersister } from './lib/idb-persister';
import { AppRoute } from './router';
import './i18n';
import './index.css';

const twentyDays = 1000 * 60 * 60 * 24 * 20; // 20 days

const queryClient = new QueryClient({
  defaultOptions: {
    queries: {
      refetchOnWindowFocus: false,
      retry: false,
      staleTime: Infinity,
      gcTime: twentyDays,
    },
  },
});

const persister = createIDBPersister();

createRoot(document.getElementById('root')!).render(
  <StrictMode>
    <PersistQueryClientProvider client={queryClient} persistOptions={{ persister, maxAge: twentyDays }}>
      <AuthProvider>
        <AppRoute />
      </AuthProvider>
    </PersistQueryClientProvider>
  </StrictMode>
);
