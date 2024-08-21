import UserImg from '@/assets/placeholder-user.jpg';
import { DynamicBreadcrumb } from '@/components/dynamic-breadcrumb/dynamic-breadcrumb';
import { TooltipLink } from '@/components/tooltip-link/tooltip-link';
import { Button } from '@/components/ui/button';
import {
  DropdownMenu,
  DropdownMenuContent,
  DropdownMenuItem,
  DropdownMenuLabel,
  DropdownMenuSeparator,
  DropdownMenuTrigger,
} from '@/components/ui/dropdown-menu';
import { Sheet, SheetContent, SheetTrigger } from '@/components/ui/sheet';
import { useAuth0 } from '@auth0/auth0-react';
import { Link, Outlet } from '@tanstack/react-router';
import { Home, LineChart, PanelLeft, Save, Settings, Users2 } from 'lucide-react';

const now = new Date().toLocaleDateString('pt-br', { dateStyle: 'full' });

export default function MainLayout() {
  const { logout } = useAuth0();

  const handleLogout = async () => {
    await logout({ logoutParams: { returnTo: window.location.origin } });
  };

  return (
    <div className='flex min-h-screen w-full flex-col bg-muted/40'>
      <aside className='fixed inset-y-0 left-0 z-10 hidden w-14 flex-col border-r bg-background sm:flex'>
        <nav className='flex flex-col items-center gap-4 px-2 sm:py-5'>
          <TooltipLink
            tooltip='Home'
            to='/'
            className='flex h-9 w-9 items-center justify-center rounded-lg text-muted-foreground transition-colors hover:text-foreground md:h-8 md:w-8 [&.active]:bg-stone-200'
          >
            <Home className='h-5 w-5' />
            <span className='sr-only'>Home</span>
          </TooltipLink>

          <TooltipLink
            tooltip='Customers'
            to='/about'
            className='flex h-9 w-9 items-center justify-center rounded-lg text-muted-foreground transition-colors hover:text-foreground md:h-8 md:w-8 [&.active]:bg-stone-200'
          >
            <Users2 className='h-5 w-5' />
            <span className='sr-only'>Customers</span>
          </TooltipLink>

          <TooltipLink
            tooltip='Analytics'
            to='/analytics'
            className='flex h-9 w-9 items-center justify-center rounded-lg text-muted-foreground transition-colors hover:text-foreground md:h-8 md:w-8 [&.active]:bg-stone-200'
          >
            <LineChart className='h-5 w-5' />
            <span className='sr-only'>Analytics</span>
          </TooltipLink>
        </nav>
        <nav className='mt-auto flex flex-col items-center gap-4 px-2 sm:py-5'>
          <TooltipLink
            tooltip='Settings'
            to='/settings'
            className='flex h-9 w-9 items-center justify-center rounded-lg text-muted-foreground transition-colors hover:text-foreground md:h-8 md:w-8 [&.active]:bg-stone-200'
          >
            <Settings className='h-5 w-5' />
            <span className='sr-only'>Settings</span>
          </TooltipLink>
        </nav>
      </aside>
      <div className='flex flex-col sm:gap-4 sm:py-4 sm:pl-14'>
        <header className='sticky top-0 z-30 flex h-14 items-center gap-4 border-b bg-background px-4 sm:static sm:h-auto sm:border-0 sm:bg-transparent sm:px-6'>
          <Sheet>
            <SheetTrigger asChild>
              <Button size='icon' variant='outline' className='sm:hidden'>
                <PanelLeft className='h-5 w-5' />
                <span className='sr-only'>Toggle Menu</span>
              </Button>
            </SheetTrigger>
            <SheetContent side='left' className='sm:max-w-xs'>
              <nav className='grid gap-6 text-lg font-medium'>
                <Link href='/' className='flex items-center gap-4 px-2.5 text-muted-foreground hover:text-foreground'>
                  <Home className='h-5 w-5' />
                  Home
                </Link>
                <Link href='#' className='flex items-center gap-4 px-2.5 text-muted-foreground hover:text-foreground'>
                  <Users2 className='h-5 w-5' />
                  Customers
                </Link>
                <Link href='#' className='flex items-center gap-4 px-2.5 text-muted-foreground hover:text-foreground'>
                  <LineChart className='h-5 w-5' />
                  Analytics
                </Link>
              </nav>
            </SheetContent>
          </Sheet>
          <DynamicBreadcrumb />
          <div className='flex justify-center w-full'>
            <h1 className='text-2xl font-semibold'>{now}</h1>
          </div>
          <div className='flex gap-8 justify-end'>
            <button className='disabled:text-stone-200'>
              <Save />
            </button>
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
                <DropdownMenuItem onClick={handleLogout}>Logout</DropdownMenuItem>
              </DropdownMenuContent>
            </DropdownMenu>
          </div>
        </header>
        <main className='grid flex-1 items-start gap-4 p-4 sm:px-6 sm:py-0 md:gap-8 lg:grid-cols-3 xl:grid-cols-3'>
          <Outlet />
        </main>
      </div>
    </div>
  );
}
