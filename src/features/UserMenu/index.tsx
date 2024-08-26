import { Button } from '@/components/ui/button';
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
import UserImg from '@/assets/placeholder-user.jpg';
import { useAuth0 } from '@auth0/auth0-react';
import { useState } from 'react';
export const UserMenu = () => {
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
    <DropdownMenu>
      <DropdownMenuTrigger asChild>
        <Button variant='outline' size='icon' className='overflow-hidden rounded-full'>
          <img src={UserImg} width={36} height={36} alt='Avatar' className='overflow-hidden rounded-full' />
        </Button>
      </DropdownMenuTrigger>
      <DropdownMenuContent align='end'>
        <DropdownMenuLabel>My Account</DropdownMenuLabel>
        <DropdownMenuSeparator />
        <DropdownMenuItem>Settings</DropdownMenuItem>
        <DropdownMenuItem>Support</DropdownMenuItem>
        <DropdownMenuSeparator />
        <DropdownMenuItem onClick={handleLogout}>
          <LogOut className='w-5 h-5 mr-2' />
          Logout
          <LoaderCircle className={cn('w-5 h-5 ml-2 animate-spin', loading ? 'visible' : 'invisible')} />
        </DropdownMenuItem>
      </DropdownMenuContent>
    </DropdownMenu>
  );
};
