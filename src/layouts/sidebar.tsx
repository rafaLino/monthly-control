import { TooltipLink } from '@/components/tooltip-link/tooltip-link';
import { Button } from '@/components/ui/button';
import { Sheet, SheetContent, SheetDescription, SheetTitle, SheetTrigger } from '@/components/ui/sheet';
import env from '@/lib/env';
import { useLocalParams } from '@/store';
import { Link } from '@tanstack/react-router';
import { BookText, History, Home, LineChart, PanelLeft, Settings } from 'lucide-react';
import { FC, PropsWithChildren, ReactElement, ReactNode, useMemo, useState } from 'react';
import { useTranslation } from 'react-i18next';

type RoutesConfig = Array<{
  to: string;
  label: string;
  icon: ReactElement;
  hidden?: boolean;
}>;

type SideBarProps = PropsWithChildren<{
  header: ReactNode;
}>;
export const SideBar: FC<SideBarProps> = ({ header, children }) => {
  const { t } = useTranslation('translation', { keyPrefix: 'sidebar' });
  const [isTransactionsEnabled] = useLocalParams<boolean>('transactions');

  const ROUTES = useMemo(
    () =>
      [
        {
          to: '/',
          label: 'home',
          icon: <Home className="size-5" />
        },
        {
          to: '/analytics',
          label: 'analytics',
          icon: <LineChart className="size-5" />
        },
        {
          to: '/transactions',
          label: 'transactions',
          icon: <BookText className="size-5" />,
          hidden: !isTransactionsEnabled
        },
        {
          to: '/history',
          label: 'history',
          icon: <History className="size-5" />,
          hidden: !env.VITE_ONLINE
        },
        {
          to: '/settings',
          label: 'settings',
          icon: <Settings className="size-5" />
        }
      ] satisfies RoutesConfig,
    [isTransactionsEnabled]
  );

  return (
    <>
      <aside className="fixed inset-y-0 left-0 z-10 hidden w-14 flex-col border-r bg-background sm:flex">
        <nav className="flex flex-col items-center gap-4 px-2 sm:py-5">
          {ROUTES.toSpliced(-1).map((route) => (
            <TooltipLink
              key={route.to}
              tooltip={t(route.label)}
              to={route.to}
              hidden={route.hidden}
              className="flex h-9 w-9 items-center justify-center rounded-lg text-muted-foreground transition-colors hover:text-foreground md:h-8 md:w-8 [&.active]:bg-stone-200"
            >
              {route.icon}
              <span className="sr-only">{t(route.label)}</span>
            </TooltipLink>
          ))}
        </nav>
        <nav className="mt-auto flex flex-col items-center gap-4 px-2 sm:py-5">
          <NavLastLink {...ROUTES.at(-1)} />
        </nav>
      </aside>
      <div className="flex flex-col sm:gap-3 sm:py-4 sm:pl-14">
        <SideBarHeader routes={ROUTES}>{header}</SideBarHeader>
        {children}
      </div>
    </>
  );
};

export const SideBarHeader: FC<PropsWithChildren & { routes: RoutesConfig }> = ({ children, routes }) => {
  const { t } = useTranslation('translation', { keyPrefix: 'sidebar' });
  const [open, setOpen] = useState(false);
  const close = () => setOpen(false);
  return (
    <header className="sticky top-0 z-30 flex h-14 items-center gap-4 border-b bg-background px-4 sm:static sm:h-auto sm:border-0 sm:bg-transparent sm:px-6">
      <Sheet open={open} onOpenChange={setOpen}>
        <SheetTitle hidden>Sidebar</SheetTitle>
        <SheetDescription hidden>Sidebar description</SheetDescription>
        <SheetTrigger asChild>
          <Button size="icon" variant="ghost" className="sm:hidden">
            <PanelLeft className="h-5 w-5" />
            <span className="sr-only">{t('toggleMenu')}</span>
          </Button>
        </SheetTrigger>
        <SheetContent side="left" className="sm:max-w-xs">
          <nav className="grid gap-6 text-lg font-medium">
            {routes.map((route) => (
              <Link
                key={route.to}
                to={route.to}
                hidden={route.hidden}
                className="flex items-center gap-4 px-2.5 text-muted-foreground hover:text-foreground"
                onClick={close}
              >
                {route.icon}
                {t(route.label)}
              </Link>
            ))}
          </nav>
        </SheetContent>
      </Sheet>
      {children}
    </header>
  );
};

const NavLastLink: FC<{
  label?: string;
  to?: string;
  hidden?: boolean;
  icon?: ReactElement;
}> = ({ label, to, icon, hidden }) => {
  return (
    <TooltipLink
      tooltip={label ?? ''}
      to={to}
      hidden={hidden}
      className="flex h-9 w-9 items-center justify-center rounded-lg text-muted-foreground transition-colors hover:text-foreground md:h-8 md:w-8 [&.active]:bg-stone-200"
    >
      {icon}
      <span className="sr-only">{label}</span>
    </TooltipLink>
  );
};
