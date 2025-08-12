import { DynamicBreadcrumb } from '@/components/dynamic-breadcrumb/dynamic-breadcrumb';
import { ProgressStatus } from '@/components/progress-status';
import { LanguageSelector } from '@/features/language-selector';
import { ReferenceDate } from '@/features/reference-date';
import { UserMenu } from '@/features/user-menu';
import { SaveOnCloud } from '@/modules/planner/features/save-on-cloud';
import { Outlet } from '@tanstack/react-router';
import { SideBar } from './sidebar';

type MainLayoutProps = {
  pageLoading?: boolean;
};
export default function MainLayout({ pageLoading }: Readonly<MainLayoutProps>) {
  return (
    <div className="flex min-h-screen flex-col bg-muted/40">
      <ProgressStatus show={pageLoading} />
      <SideBar
        header={
          <>
            <DynamicBreadcrumb />
            <ReferenceDate />
            <div className="flex gap-0 sm:gap-8 justify-end">
              <SaveOnCloud />
              <LanguageSelector />
              <UserMenu />
            </div>
          </>
        }
      >
        <Outlet />
      </SideBar>
    </div>
  );
}
