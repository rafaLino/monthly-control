import { HiddenOffline } from '@/components/hidden-offline';
import { ThemeSwitch } from '@/components/theme-switch/theme-switch';
import { Thumbnail } from '@/components/thumbnail';
import {
  DropdownMenu,
  DropdownMenuContent,
  DropdownMenuItem,
  DropdownMenuLabel,
  DropdownMenuSeparator,
  DropdownMenuTrigger
} from '@/components/ui/dropdown-menu';
import env from '@/lib/env';
import { useAuth0 } from '@auth0/auth0-react';
import { Link } from '@tanstack/react-router';
import { useTranslation } from 'react-i18next';
import { CopyDropdownMenuItem } from './components/copy-dropdown-menu-item';
import { GenerateCsvDropdownMenuItem } from './components/generate-csv-dropdown-menu-item';
import { LogoutDropdownMenuItem } from './components/logout-dropdown-menu-item';

export const UserMenu = () => {
  const { t } = useTranslation('translation', { keyPrefix: 'userMenu' });
  const { user } = useAuth0();
  return (
    <div className="flex">
      <DropdownMenu>
        <DropdownMenuTrigger asChild>
          <Thumbnail src={user?.picture} />
        </DropdownMenuTrigger>
        <DropdownMenuContent align="end">
          <DropdownMenuLabel>{t('myAccount')}</DropdownMenuLabel>
          <DropdownMenuSeparator />
          <DropdownMenuItem>
            <ThemeSwitch />
          </DropdownMenuItem>
          <DropdownMenuItem asChild>
            <Link to="/settings">{t('settings')}</Link>
          </DropdownMenuItem>
          <HiddenOffline>
            <CopyDropdownMenuItem>{t('copyData')}</CopyDropdownMenuItem>
          </HiddenOffline>
          <GenerateCsvDropdownMenuItem hidden={env.VITE_ONLINE}>{t('generateCsv')}</GenerateCsvDropdownMenuItem>
          <DropdownMenuItem disabled>{t('support')}</DropdownMenuItem>
          <HiddenOffline>
            <>
              <DropdownMenuSeparator />
              <LogoutDropdownMenuItem />
            </>
          </HiddenOffline>
        </DropdownMenuContent>
      </DropdownMenu>
    </div>
  );
};
