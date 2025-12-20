import { HiddenOffline } from '@/components/hidden-offline';
import { Tabs, TabsContent, TabsList, TabsTrigger } from '@/components/ui/tabs';
import { DataTableFilterContext } from '@/context/DataTableFilterContext';
import { useKeysDown } from '@/hooks/useKeyDown';
import { useTab } from '@/modules/planner/hooks/useTab';
import { useTemporalStore } from '@/store';
import { RegisterType } from '@/types/register.types';
import { MouseEvent, ReactNode, useMemo, useRef, useState } from 'react';
import { useTranslation } from 'react-i18next';
import { AdderDialog, AdderDialogRef } from '../adder-dialog';
import { DataTable } from '../data-table';
import { AdderButton } from './components/adder-button';
import { ExpenseCategoriesCard } from './components/expense-categories';
import { SearchInput } from './components/search-input';
import { SyncButton } from './components/sync-button';

export default function RegisterTabs() {
  const { t } = useTranslation('translation', { keyPrefix: 'registerTabs' });
  const [filter, setFilter] = useState('');
  const [tab, setTab] = useTab();

  const undo = useTemporalStore((state) => state.undo);
  const redo = useTemporalStore((state) => state.redo);

  const filterInputRef = useRef<HTMLInputElement>(null);
  const adderDialogRef = useRef<AdderDialogRef>(null);

  const handleTabChange = (value: string) => {
    setTab(value as RegisterType);
    setFilter('');
  };

  const handleOpenAdderDialog = (event: MouseEvent<HTMLButtonElement>) => {
    event.preventDefault();
    adderDialogRef.current?.openDialog();
  };

  useKeysDown({
    'ctrl.f': () => filterInputRef.current?.focus(),
    'ctrl.z': undo,
    'ctrl.y': redo,
    'alt.1': () => setTab('incomes'),
    'alt.2': () => setTab('expenses'),
    'alt.3': () => setTab('investments')
  });

  const TAB_CONFIGURATION = useMemo(
    () =>
      ({
        triggers: ['incomes', 'expenses', 'investments'] as const,
        contents: [
          {
            trigger: 'incomes',
            action: (
              <div className="w-1/3">
                <AdderButton className="block sm:hidden" onClick={handleOpenAdderDialog} />
              </div>
            )
          },
          {
            trigger: 'expenses',
            action: (
              <div className="flex flex-row items-center justify-between w-1/3 sm:w-min">
                <AdderButton className="block sm:hidden" onClick={handleOpenAdderDialog} />
                <HiddenOffline>
                  <ExpenseCategoriesCard />
                </HiddenOffline>
              </div>
            )
          },
          {
            trigger: 'investments',
            action: (
              <div className="w-1/3">
                <AdderButton className="block sm:hidden" onClick={handleOpenAdderDialog} />
              </div>
            )
          }
        ]
      }) satisfies {
        triggers: Array<RegisterType>;
        contents: Array<{ trigger: RegisterType; action: ReactNode }>;
      },
    [handleOpenAdderDialog]
  );

  return (
    <>
      <AdderDialog dialogRef={adderDialogRef} />
      <Tabs value={tab} defaultValue="incomes" onValueChange={handleTabChange}>
        <div className="flex items-center justify-between flex-wrap gap-1 sm:gap-2">
          <TabsList>
            {TAB_CONFIGURATION.triggers.map((trigger) => (
              <TabsTrigger key={trigger} aria-label={trigger} value={trigger}>
                {t(trigger)}
              </TabsTrigger>
            ))}
          </TabsList>
          <SearchInput
            ref={filterInputRef}
            type="search"
            placeholder={t('search')}
            value={filter}
            onChange={(e) => setFilter(e.target.value)}
          />
          <div className="flex items-center sm:gap-2 sm:order-3">
            <SyncButton />
          </div>
        </div>
        <DataTableFilterContext.Provider value={filter}>
          {TAB_CONFIGURATION.contents.map(({ trigger, action }) => (
            <TabsContent key={trigger} value={trigger}>
              <DataTable key={trigger} type={trigger}>
                {action}
              </DataTable>
            </TabsContent>
          ))}
        </DataTableFilterContext.Provider>
      </Tabs>
    </>
  );
}
