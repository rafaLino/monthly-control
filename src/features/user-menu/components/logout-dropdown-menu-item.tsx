import { DropdownMenuItem } from '@/components/ui/dropdown-menu';
import { cn } from '@/lib/utils';
import { useAuth0 } from '@auth0/auth0-react';
import { LoaderCircle, LogOut } from 'lucide-react';
import { useState } from 'react';
import { useTranslation } from 'react-i18next';

export const LogoutDropdownMenuItem = () => {
  const { t } = useTranslation('translation', { keyPrefix: 'userMenu' });
  const { logout } = useAuth0();
  const [loading, setLoading] = useState(false);
  const handleLogout = async () => {
    setLoading(true);
    try {
      await logout({ logoutParams: { returnTo: `${window.location.origin}/login` } });
    } finally {
      setLoading(false);
    }
  };
  return (
    <DropdownMenuItem onClick={handleLogout}>
      <LogOut className="w-5 h-5 mr-2" />
      {t('logout')}
      <LoaderCircle className={cn('w-5 h-5 ml-2 animate-spin', loading ? 'visible' : 'invisible')} />
    </DropdownMenuItem>
  );
};
