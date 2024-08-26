import { Button } from '@/components/ui/button';
import { Input } from '@/components/ui/input';
import { Tabs, TabsContent, TabsList, TabsTrigger } from '@/components/ui/tabs';
import { DataTableFilterContext } from '@/context/DataTableFilterContext';
import { RefreshCw, Search } from 'lucide-react';
import { useState } from 'react';
import { DataTable } from '../DataTable';
import { useSave } from './hooks/useSave';
import { cn } from '@/lib/utils';
export default function RegisterTabs() {
  const [filter, setFilter] = useState('');
  const [saving, save] = useSave();
  return (
    <Tabs defaultValue='incomes' onValueChange={() => setFilter('')}>
      <div className='flex items-center justify-between flex-wrap gap-1 sm:gap-2'>
        <TabsList>
          <TabsTrigger value='incomes'>Incomes</TabsTrigger>
          <TabsTrigger value='expenses'>Expenses</TabsTrigger>
          <TabsTrigger value='investments'>Investments</TabsTrigger>
        </TabsList>
        <div className='relative flex md:grow-0 order-3 w-full sm:w-auto'>
          <Search className='absolute left-2.5 top-2.5 h-4 w-4 text-muted-foreground' />
          <Input
            type='search'
            placeholder='Search...'
            className='w-full rounded-lg bg-background pl-8 md:w-[200px] lg:w-[336px]'
            value={filter}
            onChange={(e) => setFilter(e.target.value)}
          />
        </div>
        <div className='flex items-center sm:gap-2 sm:order-3'>
          <Button
            size='sm'
            variant='link'
            className={cn('h-7 gap-1 text-sm disabled:text-stone-400', saving && 'animate-spin')}
            disabled={saving}
            onClick={save}
          >
            <RefreshCw className='h-5.5 w-5.5' />
          </Button>
        </div>
      </div>
      <DataTableFilterContext.Provider value={filter}>
        <TabsContent value='incomes'>
          <DataTable key='incomes' type='incomes' />
        </TabsContent>
        <TabsContent value='expenses'>
          <DataTable key='expenses' type='expenses' />
        </TabsContent>
        <TabsContent value='investments'>
          <DataTable key='investments' type='investments' />
        </TabsContent>
      </DataTableFilterContext.Provider>
    </Tabs>
  );
}
