import {
  DropdownMenu,
  DropdownMenuContent,
  DropdownMenuItem,
  DropdownMenuLabel,
  DropdownMenuSeparator,
  DropdownMenuTrigger,
} from '@/components/ui/dropdown-menu';
import { cn } from '@/lib/utils';
import { LoaderCircle, LogOut } from 'lucide-react';
import { useAuth0 } from '@auth0/auth0-react';
import { useState } from 'react';
import { useTranslation } from 'react-i18next';
import { Thumbnail } from '@/components/Thumbnail';
export const UserMenu = () => {
  const { t } = useTranslation('translation', { keyPrefix: 'userMenu' });
  const { logout, user } = useAuth0();
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
    <div className='flex'>
      <DropdownMenu>
        <DropdownMenuTrigger asChild>
          <Thumbnail src={user?.picture} />
        </DropdownMenuTrigger>
        <DropdownMenuContent align='end'>
          <DropdownMenuLabel>{t('myAccount')}</DropdownMenuLabel>
          <DropdownMenuSeparator />
          <DropdownMenuItem>{t('settings')}</DropdownMenuItem>
          <DropdownMenuItem>{t('support')}</DropdownMenuItem>
          <DropdownMenuSeparator />
          <DropdownMenuItem onClick={handleLogout}>
            <LogOut className='w-5 h-5 mr-2' />
            {t('logout')}
            <LoaderCircle className={cn('w-5 h-5 ml-2 animate-spin', loading ? 'visible' : 'invisible')} />
          </DropdownMenuItem>
        </DropdownMenuContent>
      </DropdownMenu>
    </div>
  );
};
