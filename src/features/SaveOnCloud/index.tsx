import env from '@/lib/env';
import { SaveOnCloudActions } from './components/save-on-cloud-actions';
import { useLocation } from '@tanstack/react-router';

export const SaveOnCloud = () => {
  const pathName = useLocation({
    select: (location) => location.pathname
  });

  if (!env.VITE_ONLINE || pathName !== '/') return null;

  return <SaveOnCloudActions />;
};
