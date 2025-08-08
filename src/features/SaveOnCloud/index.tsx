import env from '@/lib/env';
import { useLocation } from '@tanstack/react-router';
import { SaveOnCloudActions } from './components/save-on-cloud-actions';

export const SaveOnCloud = () => {
  const pathName = useLocation({
    select: (location) => location.pathname
  });

  if (!env.VITE_ONLINE || pathName !== '/') return null;

  return <SaveOnCloudActions />;
};
