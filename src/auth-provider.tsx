import { Auth0Provider } from '@auth0/auth0-react';
import { FC, PropsWithChildren } from 'react';
import env from './lib/env';

const local = env.MODE === 'local';
export const AuthProvider: FC<PropsWithChildren> = ({ children }) => {
  return local ? (
    <>{children}</>
  ) : (
    <Auth0Provider
      domain={env.VITE_DOMAIN}
      clientId={env.VITE_CLIENT_ID}
      authorizationParams={{
        redirect_uri: window.location.origin,
      }}
    >
      {children}
    </Auth0Provider>
  );
};
