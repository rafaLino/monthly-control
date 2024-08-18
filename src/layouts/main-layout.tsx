import { Input } from '@/components/ui/input';
import {
  DropdownMenu,
  DropdownMenuContent,
  DropdownMenuItem,
  DropdownMenuLabel,
  DropdownMenuSeparator,
  DropdownMenuTrigger,
} from '@/components/ui/dropdown-menu';
import { Sheet, SheetContent, SheetTrigger } from '@/components/ui/sheet';
import { Home, LineChart, PanelLeft, Search, Users2, Settings } from 'lucide-react';
import { Button } from '@/components/ui/button';
import UserImg from '@/assets/placeholder-user.jpg';
import { Link, Outlet } from '@tanstack/react-router';
import { TooltipLink } from '@/components/tooltip-link/tooltip-link';
import { DynamicBreadcrumb } from '@/components/dynamic-breadcrumb/dynamic-breadcrumb';
import { ProgressStatus } from '@/components/progress-status';

export default function MainLayout() {
  return (
    <div className='flex min-h-screen w-full flex-col bg-muted/40'>
      <ProgressStatus />
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
          <div className='relative ml-auto flex-1 md:grow-0'>
            <Search className='absolute left-2.5 top-2.5 h-4 w-4 text-muted-foreground' />
            <Input
              type='search'
              placeholder='Search...'
              className='w-full rounded-lg bg-background pl-8 md:w-[200px] lg:w-[336px]'
            />
          </div>
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
              <DropdownMenuItem>Logout</DropdownMenuItem>
            </DropdownMenuContent>
          </DropdownMenu>
        </header>
        <main className='grid flex-1 items-start gap-4 p-4 sm:px-6 sm:py-0 md:gap-8 lg:grid-cols-3 xl:grid-cols-3'>
          <Outlet />
        </main>
      </div>
    </div>
  );
}
