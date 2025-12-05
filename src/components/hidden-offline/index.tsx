import env from '@/lib/env';
import { FC, PropsWithChildren } from 'react';

export const HiddenOffline: FC<PropsWithChildren> = ({ children }) => {
  return env.VITE_ONLINE ? children : null;
};
