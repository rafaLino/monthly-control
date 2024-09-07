import { Button } from '@/components/ui/button';
import { Input } from '@/components/ui/input';
import { Tabs, TabsContent, TabsList, TabsTrigger } from '@/components/ui/tabs';
import { DataTableFilterContext } from '@/context/DataTableFilterContext';
import { cn } from '@/lib/utils';
import { RefreshCw, Search } from 'lucide-react';
import { useState } from 'react';
import { useTranslation } from 'react-i18next';
import { DataTable } from '../DataTable';
import { useSave } from './hooks/useSave';
export default function RegisterTabs() {
  const { t } = useTranslation('translation', { keyPrefix: 'registerTabs' });
  const [filter, setFilter] = useState('');
  const [saving, save] = useSave();
  return (
    <Tabs defaultValue="incomes" onValueChange={() => setFilter('')}>
      <div className="flex items-center justify-between flex-wrap gap-1 sm:gap-2">
        <TabsList>
          <TabsTrigger value="incomes">{t('incomes')}</TabsTrigger>
          <TabsTrigger value="expenses">{t('expenses')}</TabsTrigger>
          <TabsTrigger value="investments">{t('investments')}</TabsTrigger>
        </TabsList>
        <div className="relative flex md:grow-0 order-3 w-full sm:w-auto">
          <Search className="absolute left-2.5 top-2.5 h-4 w-4 text-muted-foreground" />
          <Input
            type="search"
            placeholder={t('search')}
            className="w-full rounded-lg bg-background pl-8 md:w-[200px] lg:w-[336px]"
            value={filter}
            onChange={(e) => setFilter(e.target.value)}
          />
        </div>
        <div className="flex items-center sm:gap-2 sm:order-3">
          <Button
            size="sm"
            variant="link"
            className={cn('h-7 gap-1 text-sm disabled:text-stone-400', saving && 'animate-spin')}
            disabled={saving}
            onClick={save}
          >
            <RefreshCw className="h-5.5 w-5.5" />
          </Button>
        </div>
      </div>
      <DataTableFilterContext.Provider value={filter}>
        <TabsContent value="incomes">
          <DataTable key="incomes" type="incomes" />
        </TabsContent>
        <TabsContent value="expenses">
          <DataTable key="expenses" type="expenses" />
        </TabsContent>
        <TabsContent value="investments">
          <DataTable key="investments" type="investments" />
        </TabsContent>
      </DataTableFilterContext.Provider>
    </Tabs>
  );
}
