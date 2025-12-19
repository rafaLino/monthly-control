import { HiddenOffline } from '@/components/hidden-offline';
import { Tabs, TabsContent, TabsList, TabsTrigger } from '@/components/ui/tabs';
import { DataTableFilterContext } from '@/context/DataTableFilterContext';
import { useKeysDown } from '@/hooks/useKeyDown';
import { useTemporalStore } from '@/store';
import { useRef, useState } from 'react';
import { useTranslation } from 'react-i18next';
import { DataTable } from '../data-table';
import { ExpenseCategoriesCard } from './components/expense-categories';
import { SearchInput } from './components/search-input';
import { SyncButton } from './components/sync-button';
import { RegisterType } from '@/types/register.types';

export default function RegisterTabs() {
  const { t } = useTranslation('translation', { keyPrefix: 'registerTabs' });
  const filterInputRef = useRef<HTMLInputElement>(null);
  const { undo, redo } = useTemporalStore((state) => state);
  const [filter, setFilter] = useState('');
  const [tab, setTab] = useState<RegisterType>('incomes')

  const handleTabChange = (value: string) => {
    setTab(value as RegisterType);
    setFilter('');
  }

  useKeysDown({
    'ctrl.f': () => filterInputRef.current?.focus(),
    'ctrl.z': undo,
    'ctrl.y': redo,
    'alt.1': () => setTab('incomes'),
    'alt.2': () => setTab('expenses'),
    'alt.3': () => setTab('investments'),
  });

  return (
    <Tabs value={tab} defaultValue="incomes" onValueChange={handleTabChange}>
      <div className="flex items-center justify-between flex-wrap gap-1 sm:gap-2">
        <TabsList>
          <TabsTrigger aria-label="incomes" value="incomes">
            {t('incomes')}
          </TabsTrigger>
          <TabsTrigger aria-label="expenses" value="expenses">
            {t('expenses')}
          </TabsTrigger>
          <TabsTrigger aria-label="investments" value="investments">
            {t('investments')}
          </TabsTrigger>
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
        <TabsContent value="incomes">
          <DataTable key="incomes" type="incomes" />
        </TabsContent>
        <TabsContent value="expenses">
          <DataTable key="expenses" type="expenses">
            <HiddenOffline>
              <ExpenseCategoriesCard />
            </HiddenOffline>
          </DataTable>
        </TabsContent>
        <TabsContent value="investments">
          <DataTable key="investments" type="investments" />
        </TabsContent>
      </DataTableFilterContext.Provider>
    </Tabs>
  );
}
