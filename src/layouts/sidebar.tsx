import { TooltipLink } from '@/components/tooltip-link/tooltip-link';
import { Button } from '@/components/ui/button';
import { Sheet, SheetContent, SheetTrigger } from '@/components/ui/sheet';
import { Link } from '@tanstack/react-router';
import { Home, LineChart, PanelLeft, Settings } from 'lucide-react';
import { FC, PropsWithChildren, ReactNode } from 'react';
import { useTranslation } from 'react-i18next';

type SideBarProps = PropsWithChildren<{
  header: ReactNode;
}>;
export const SideBar: FC<SideBarProps> = ({ header, children }) => {
  const { t } = useTranslation('translation', { keyPrefix: 'sidebar' });
  return (
    <>
      <aside className="fixed inset-y-0 left-0 z-10 hidden w-14 flex-col border-r bg-background sm:flex">
        <nav className="flex flex-col items-center gap-4 px-2 sm:py-5">
          <TooltipLink
            tooltip={t('home')}
            to="/"
            className="flex h-9 w-9 items-center justify-center rounded-lg text-muted-foreground transition-colors hover:text-foreground md:h-8 md:w-8 [&.active]:bg-stone-200"
          >
            <Home className="h-5 w-5" />
            <span className="sr-only">{t('home')}</span>
          </TooltipLink>

          <TooltipLink
            tooltip={t('analytics')}
            to="/analytics"
            className="flex h-9 w-9 items-center justify-center rounded-lg text-muted-foreground transition-colors hover:text-foreground md:h-8 md:w-8 [&.active]:bg-stone-200"
          >
            <LineChart className="h-5 w-5" />
            <span className="sr-only">{t('analytics')}</span>
          </TooltipLink>
        </nav>
        <nav className="mt-auto flex flex-col items-center gap-4 px-2 sm:py-5">
          <TooltipLink
            tooltip={t('settings')}
            to="/settings"
            className="flex h-9 w-9 items-center justify-center rounded-lg text-muted-foreground transition-colors hover:text-foreground md:h-8 md:w-8 [&.active]:bg-stone-200"
          >
            <Settings className="h-5 w-5" />
            <span className="sr-only">{t('settings')}</span>
          </TooltipLink>
        </nav>
      </aside>
      <div className="flex flex-col sm:gap-4 sm:py-4 sm:pl-14">
        <SideBarHeader>{header}</SideBarHeader>
        {children}
      </div>
    </>
  );
};

export const SideBarHeader: FC<PropsWithChildren> = ({ children }) => {
  const { t } = useTranslation('translation', { keyPrefix: 'sidebar' });
  return (
    <header className="sticky top-0 z-30 flex h-14 items-center gap-4 border-b bg-background px-4 sm:static sm:h-auto sm:border-0 sm:bg-transparent sm:px-6">
      <Sheet>
        <SheetTrigger asChild>
          <Button size="icon" variant="ghost" className="sm:hidden">
            <PanelLeft className="h-5 w-5" />
            <span className="sr-only">{t('toggleMenu')}</span>
          </Button>
        </SheetTrigger>
        <SheetContent side="left" className="sm:max-w-xs">
          <nav className="grid gap-6 text-lg font-medium">
            <Link to="/" className="flex items-center gap-4 px-2.5 text-muted-foreground hover:text-foreground">
              <Home className="h-5 w-5" />
              {t('home')}
            </Link>
            <Link to="/analytics" className="flex items-center gap-4 px-2.5 text-muted-foreground hover:text-foreground">
              <LineChart className="h-5 w-5" />
              {t('analytics')}
            </Link>
            <Link to="/settings" className="flex items-center gap-4 px-2.5 text-muted-foreground hover:text-foreground">
              <LineChart className="h-5 w-5" />
              {t('settings')}
            </Link>
          </nav>
        </SheetContent>
      </Sheet>
      {children}
    </header>
  );
};
