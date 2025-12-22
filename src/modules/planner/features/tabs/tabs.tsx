import { HiddenOffline } from '@/components/hidden-offline';
import { Tabs, TabsContent, TabsList, TabsTrigger } from '@/components/ui/tabs';
import { DataTableFilterContext } from '@/context/DataTableFilterContext';
import { DataTableMenuContext } from '@/context/DataTableMenuContext';
import { useKeysDown } from '@/hooks/useKeyDown';
import { useTemporalStore } from '@/store';
import { RegisterType, RegisterTypes } from '@/types/register.types';
import { MouseEvent, ReactNode, useMemo, useRef, useState } from 'react';
import { useTranslation } from 'react-i18next';
import { AdderDialog, AdderDialogRef } from '../adder-dialog';
import { DataTable } from '../data-table';
import { ExpenseCategoriesCard } from './components/expense-categories';
import { SearchInput } from './components/search-input';
import { SyncButton } from './components/sync-button';

const ExtraContentMap = new Map<RegisterType, ReactNode>([
  [
    'expenses',
    <HiddenOffline key="expenses-extra-content">
      <ExpenseCategoriesCard />
    </HiddenOffline>
  ]
]);

export default function RegisterTabs() {
  const { t } = useTranslation('translation', { keyPrefix: 'registerTabs' });
  const [filter, setFilter] = useState('');
  const [tab, setTab] = useState<RegisterType>();

  const undo = useTemporalStore((state) => state.undo);
  const redo = useTemporalStore((state) => state.redo);

  const filterInputRef = useRef<HTMLInputElement>(null);
  const adderDialogRef = useRef<AdderDialogRef>(null);

  const handleTabChange = (value: string) => {
    setTab(value as RegisterType);
    setFilter('');
  };

  const menuContextValue = useMemo(
    () => ({
      onClick: (event: MouseEvent<HTMLButtonElement>) => {
        event.preventDefault();
        adderDialogRef.current?.openDialog();
      }
    }),
    []
  );

  useKeysDown({
    'ctrl.f': () => filterInputRef.current?.focus(),
    'ctrl.z': undo,
    'ctrl.y': redo,
    'alt.1': () => setTab('incomes'),
    'alt.2': () => setTab('expenses'),
    'alt.3': () => setTab('investments')
  });

  return (
    <>
      <AdderDialog dialogRef={adderDialogRef} />
      <Tabs value={tab} defaultValue="incomes" onValueChange={handleTabChange}>
        <div className="flex items-center justify-between flex-wrap gap-1 sm:gap-2">
          <TabsList>
            {RegisterTypes.map((type) => (
              <TabsTrigger key={type} aria-label={type} value={type}>
                {t(type)}
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
        <DataTableMenuContext.Provider value={menuContextValue}>
          <DataTableFilterContext.Provider value={filter}>
            {RegisterTypes.map((type) => (
              <TabsContent key={type} value={type}>
                <DataTable key={type} type={type as RegisterType}>
                  {ExtraContentMap.get(type)}
                </DataTable>
              </TabsContent>
            ))}
          </DataTableFilterContext.Provider>
        </DataTableMenuContext.Provider>
      </Tabs>
    </>
  );
}
