import { DynamicBreadcrumb } from '@/components/dynamic-breadcrumb/dynamic-breadcrumb';
import { ProgressStatus } from '@/components/progress-status';
import { SaveOnCloud } from '@/features/SaveOnCloud';
import { UserMenu } from '@/features/UserMenu';
import { Outlet } from '@tanstack/react-router';
import { useTranslation } from 'react-i18next';
import { SideBar } from './sidebar';

const NOW = new Date();

type MainLayoutProps = {
  pageLoading?: boolean;
};
export default function MainLayout({ pageLoading }: Readonly<MainLayoutProps>) {
  const { t } = useTranslation('translation');
  return (
    <div className='flex min-h-screen w-screen flex-col bg-muted/40'>
      <ProgressStatus show={pageLoading} />
      <SideBar
        header={
          <>
            <DynamicBreadcrumb />
            <div className='flex justify-center w-full'>
              <h1 className='sm:text-2xl font-semibold whitespace-nowrap'>{t('date', { date: NOW })}</h1>
            </div>
            <div className='flex gap-8 justify-end'>
              <SaveOnCloud />
              <UserMenu />
            </div>
          </>
        }
      >
        <main className='grid flex-1 items-start gap-4 p-2 sm:py-0 md:gap-8 lg:grid-cols-3 xl:grid-cols-3'>
          <Outlet />
        </main>
      </SideBar>
    </div>
  );
}
