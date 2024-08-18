import { Home, LineChart, Package, Package2, Settings, ShoppingCart, Users2 } from 'lucide-react';
import { NavigationMenu, NavigationMenuLink } from '../ui/navigation-menu';
import { Tooltip, TooltipContent, TooltipProvider, TooltipTrigger } from '../ui/tooltip';

const Link: React.FC<React.ComponentPropsWithoutRef<'a'> & { tooltip: string }> = ({ href, tooltip, children }) => {
  return (
    <TooltipProvider>
      <Tooltip>
        <TooltipTrigger asChild>
          <NavigationMenu>
            <NavigationMenuLink href={href}>{children}</NavigationMenuLink>
          </NavigationMenu>
        </TooltipTrigger>
        <TooltipContent side='right'>{tooltip}</TooltipContent>
      </Tooltip>
    </TooltipProvider>
  );
};

export default function NavigationBar() {
  return (
    <aside className='fixed inset-y-0 left-0 z-10 hidden w-14 flex-col border-r bg-background sm:flex'>
      <nav className='flex flex-col items-center gap-4 px-2 sm:py-5'>
        <Link
          tooltip='Acme Inc'
          href='#'
          className='group flex h-9 w-9 shrink-0 items-center justify-center gap-2 rounded-full bg-primary text-lg font-semibold text-primary-foreground md:h-8 md:w-8 md:text-base'
        >
          <Package2 className='h-4 w-4 transition-all group-hover:scale-110' />
          <span className='sr-only'>Acme Inc</span>
        </Link>

        <Link
          tooltip='Dashboard'
          href='#'
          className='flex h-9 w-9 items-center justify-center rounded-lg text-muted-foreground transition-colors hover:text-foreground md:h-8 md:w-8'
        >
          <Home className='h-5 w-5' />
          <span className='sr-only'>Dashboard</span>
        </Link>

        <Link
          tooltip='Orders'
          href='#'
          className='flex h-9 w-9 items-center justify-center rounded-lg bg-accent text-accent-foreground transition-colors hover:text-foreground md:h-8 md:w-8'
        >
          <ShoppingCart className='h-5 w-5' />
          <span className='sr-only'>Orders</span>
        </Link>

        <Link
          tooltip='Products'
          href='#'
          className='flex h-9 w-9 items-center justify-center rounded-lg text-muted-foreground transition-colors hover:text-foreground md:h-8 md:w-8'
        >
          <Package className='h-5 w-5' />
          <span className='sr-only'>Products</span>
        </Link>

        <Link
          tooltip='Customers'
          href='#'
          className='flex h-9 w-9 items-center justify-center rounded-lg text-muted-foreground transition-colors hover:text-foreground md:h-8 md:w-8'
        >
          <Users2 className='h-5 w-5' />
          <span className='sr-only'>Customers</span>
        </Link>

        <Link
          tooltip='Analytics'
          href='#'
          className='flex h-9 w-9 items-center justify-center rounded-lg text-muted-foreground transition-colors hover:text-foreground md:h-8 md:w-8'
        >
          <LineChart className='h-5 w-5' />
          <span className='sr-only'>Analytics</span>
        </Link>
      </nav>
      <nav className='mt-auto flex flex-col items-center gap-4 px-2 sm:py-5'>
        <Link
          tooltip='Settings'
          href='#'
          className='flex h-9 w-9 items-center justify-center rounded-lg text-muted-foreground transition-colors hover:text-foreground md:h-8 md:w-8'
        >
          <Settings className='h-5 w-5' />
          <span className='sr-only'>Settings</span>
        </Link>
      </nav>
    </aside>
  );
}
