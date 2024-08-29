import { DynamicBreadcrumb } from '@/components/dynamic-breadcrumb/dynamic-breadcrumb';
import { ProgressStatus } from '@/components/progress-status';
import { LanguageSelector } from '@/features/LanguageSelector';
import { ReferenceDate } from '@/features/ReferenceDate';
import { SaveOnCloud } from '@/features/SaveOnCloud';
import { UserMenu } from '@/features/UserMenu';
import { Outlet } from '@tanstack/react-router';
import { SideBar } from './sidebar';

type MainLayoutProps = {
  pageLoading?: boolean;
};
export default function MainLayout({ pageLoading }: Readonly<MainLayoutProps>) {
  return (
    <div className='flex min-h-screen w-screen flex-col bg-muted/40'>
      <ProgressStatus show={pageLoading} />
      <SideBar
        header={
          <>
            <DynamicBreadcrumb />
            <ReferenceDate />
            <div className='flex gap-0 sm:gap-8 justify-end'>
              <SaveOnCloud />
              <LanguageSelector />
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
