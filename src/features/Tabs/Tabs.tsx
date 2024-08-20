import { Button } from '@/components/ui/button';
import { Tabs, TabsContent, TabsList, TabsTrigger } from '@/components/ui/tabs';
import { DataTableFilterContext } from '@/context/DataTableFilterContext';
import { File, Search } from 'lucide-react';
import { useState } from 'react';
import { DataTable } from '../DataTable';
import { Input } from '@/components/ui/input';
export default function RegisterTabs() {
  const [filter, setFilter] = useState('');
  return (
    <Tabs defaultValue='incomes' onValueChange={() => setFilter('')}>
      <div className='flex items-center'>
        <TabsList>
          <TabsTrigger value='incomes'>Incomes</TabsTrigger>
          <TabsTrigger value='expenses'>Expenses</TabsTrigger>
          <TabsTrigger value='investments'>Investments</TabsTrigger>
        </TabsList>
        <div className='relative ml-auto flex-1 md:grow-0'>
          <Search className='absolute left-2.5 top-2.5 h-4 w-4 text-muted-foreground' />
          <Input
            type='search'
            placeholder='Search...'
            className='w-full rounded-lg bg-background pl-8 md:w-[200px] lg:w-[336px]'
            value={filter}
            onChange={(e) => setFilter(e.target.value)}
          />
        </div>
        <div className='ml-auto flex items-center gap-2'>
          <Button size='sm' variant='outline' className='h-7 gap-1 text-sm'>
            <File className='h-3.5 w-3.5' />
            <span className='sr-only sm:not-sr-only'>Export</span>
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
