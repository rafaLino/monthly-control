import { Auth0Provider } from '@auth0/auth0-react';
import { StrictMode } from 'react';
import { createRoot } from 'react-dom/client';
import './index.css';
import env from './lib/env';
import { AppRoute } from './router';

createRoot(document.getElementById('root')!).render(
  <StrictMode>
    <Auth0Provider
      domain={env.VITE_DOMAIN}
      clientId={env.VITE_CLIENT_ID}
      authorizationParams={{
        redirect_uri: window.location.origin,
      }}
    >
      <AppRoute />
    </Auth0Provider>
  </StrictMode>
);
