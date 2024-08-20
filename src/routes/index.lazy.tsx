import { Card, CardContent, CardDescription, CardFooter, CardHeader, CardTitle } from '@/components/ui/card';
import {
  DropdownMenu,
  DropdownMenuCheckboxItem,
  DropdownMenuContent,
  DropdownMenuItem,
  DropdownMenuLabel,
  DropdownMenuSeparator,
  DropdownMenuTrigger,
} from '@/components/ui/dropdown-menu';
import { Pagination, PaginationContent, PaginationItem } from '@/components/ui/pagination';
import { Separator } from '@/components/ui/separator';

import { Button } from '@/components/ui/button';
import { Tabs, TabsContent, TabsList, TabsTrigger } from '@/components/ui/tabs';
import { ExpensesBalanceCard, IncomesBalanceCard, InvestmentsBalanceCard, TotalBalance } from '@/features/Balance';
import { DataTable } from '@/features/DataTable';
import { GoalCard } from '@/features/GoalCard';
import { createLazyFileRoute } from '@tanstack/react-router';
import {
  ChevronLeft,
  ChevronRight,
  Copy,
  CreditCard,
  File,
  ListFilter,
  MoreVertical,
  Search,
  Truck,
} from 'lucide-react';
import { Input } from '@/components/ui/input';
import { DataTableFilterContext } from '@/context/DataTableFilterContext';
import { useState } from 'react';

export const Route = createLazyFileRoute('/')({
  component: Index,
});

function Index() {
  const [filter, setFilter] = useState('');
  return (
    <>
      <div className='grid auto-rows-max items-start gap-4 md:gap-8 lg:col-span-2'>
        <div className='grid gap-4 sm:grid-cols-2 md:grid-cols-4 lg:grid-cols-2 xl:grid-cols-4'>
          <TotalBalance />
          <GoalCard />
        </div>
        <div className='grid gap-4 sm:grid-cols-2 md:grid-cols-4 lg:grid-cols-2 xl:grid-cols-4'>
          <IncomesBalanceCard />
          <ExpensesBalanceCard />
          <InvestmentsBalanceCard />
        </div>
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
              <DropdownMenu>
                <DropdownMenuTrigger asChild>
                  <Button variant='outline' size='sm' className='h-7 gap-1 text-sm'>
                    <ListFilter className='h-3.5 w-3.5' />
                    <span className='sr-only sm:not-sr-only'>Filter</span>
                  </Button>
                </DropdownMenuTrigger>
                <DropdownMenuContent align='end'>
                  <DropdownMenuLabel>Filter by</DropdownMenuLabel>
                  <DropdownMenuSeparator />
                  <DropdownMenuCheckboxItem checked>Checkeds</DropdownMenuCheckboxItem>
                  <DropdownMenuCheckboxItem>Uncheckeds</DropdownMenuCheckboxItem>
                </DropdownMenuContent>
              </DropdownMenu>
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
      </div>
      <div>
        <Card className='overflow-hidden' x-chunk='dashboard-05-chunk-4'>
          <CardHeader className='flex flex-row items-start bg-muted/50'>
            <div className='grid gap-0.5'>
              <CardTitle className='group flex items-center gap-2 text-lg'>
                Order Oe31b70H
                <Button
                  size='icon'
                  variant='outline'
                  className='h-6 w-6 opacity-0 transition-opacity group-hover:opacity-100'
                >
                  <Copy className='h-3 w-3' />
                  <span className='sr-only'>Copy Order ID</span>
                </Button>
              </CardTitle>
              <CardDescription>Date: November 23, 2023</CardDescription>
            </div>
            <div className='ml-auto flex items-center gap-1'>
              <Button size='sm' variant='outline' className='h-8 gap-1'>
                <Truck className='h-3.5 w-3.5' />
                <span className='lg:sr-only xl:not-sr-only xl:whitespace-nowrap'>Track Order</span>
              </Button>
              <DropdownMenu>
                <DropdownMenuTrigger asChild>
                  <Button size='icon' variant='outline' className='h-8 w-8'>
                    <MoreVertical className='h-3.5 w-3.5' />
                    <span className='sr-only'>More</span>
                  </Button>
                </DropdownMenuTrigger>
                <DropdownMenuContent align='end'>
                  <DropdownMenuItem>Edit</DropdownMenuItem>
                  <DropdownMenuItem>Export</DropdownMenuItem>
                  <DropdownMenuSeparator />
                  <DropdownMenuItem>Trash</DropdownMenuItem>
                </DropdownMenuContent>
              </DropdownMenu>
            </div>
          </CardHeader>
          <CardContent className='p-6 text-sm'>
            <div className='grid gap-3'>
              <div className='font-semibold'>Order Details</div>
              <ul className='grid gap-3'>
                <li className='flex items-center justify-between'>
                  <span className='text-muted-foreground'>
                    Glimmer Lamps x <span>2</span>
                  </span>
                  <span>$250.00</span>
                </li>
                <li className='flex items-center justify-between'>
                  <span className='text-muted-foreground'>
                    Aqua Filters x <span>1</span>
                  </span>
                  <span>$49.00</span>
                </li>
              </ul>
              <Separator className='my-2' />
              <ul className='grid gap-3'>
                <li className='flex items-center justify-between'>
                  <span className='text-muted-foreground'>Subtotal</span>
                  <span>$299.00</span>
                </li>
                <li className='flex items-center justify-between'>
                  <span className='text-muted-foreground'>Shipping</span>
                  <span>$5.00</span>
                </li>
                <li className='flex items-center justify-between'>
                  <span className='text-muted-foreground'>Tax</span>
                  <span>$25.00</span>
                </li>
                <li className='flex items-center justify-between font-semibold'>
                  <span className='text-muted-foreground'>Total</span>
                  <span>$329.00</span>
                </li>
              </ul>
            </div>
            <Separator className='my-4' />
            <div className='grid grid-cols-2 gap-4'>
              <div className='grid gap-3'>
                <div className='font-semibold'>Shipping Information</div>
                <address className='grid gap-0.5 not-italic text-muted-foreground'>
                  <span>Liam Johnson</span>
                  <span>1234 Main St.</span>
                  <span>Anytown, CA 12345</span>
                </address>
              </div>
              <div className='grid auto-rows-max gap-3'>
                <div className='font-semibold'>Billing Information</div>
                <div className='text-muted-foreground'>Same as shipping address</div>
              </div>
            </div>
            <Separator className='my-4' />
            <div className='grid gap-3'>
              <div className='font-semibold'>Customer Information</div>
              <dl className='grid gap-3'>
                <div className='flex items-center justify-between'>
                  <dt className='text-muted-foreground'>Customer</dt>
                  <dd>Liam Johnson</dd>
                </div>
                <div className='flex items-center justify-between'>
                  <dt className='text-muted-foreground'>Email</dt>
                  <dd>
                    <a href='mailto:'>liam@acme.com</a>
                  </dd>
                </div>
                <div className='flex items-center justify-between'>
                  <dt className='text-muted-foreground'>Phone</dt>
                  <dd>
                    <a href='tel:'>+1 234 567 890</a>
                  </dd>
                </div>
              </dl>
            </div>
            <Separator className='my-4' />
            <div className='grid gap-3'>
              <div className='font-semibold'>Payment Information</div>
              <dl className='grid gap-3'>
                <div className='flex items-center justify-between'>
                  <dt className='flex items-center gap-1 text-muted-foreground'>
                    <CreditCard className='h-4 w-4' />
                    Visa
                  </dt>
                  <dd>**** **** **** 4532</dd>
                </div>
              </dl>
            </div>
          </CardContent>
          <CardFooter className='flex flex-row items-center border-t bg-muted/50 px-6 py-3'>
            <div className='text-xs text-muted-foreground'>
              Updated <time dateTime='2023-11-23'>November 23, 2023</time>
            </div>
            <Pagination className='ml-auto mr-0 w-auto'>
              <PaginationContent>
                <PaginationItem>
                  <Button size='icon' variant='outline' className='h-6 w-6'>
                    <ChevronLeft className='h-3.5 w-3.5' />
                    <span className='sr-only'>Previous Order</span>
                  </Button>
                </PaginationItem>
                <PaginationItem>
                  <Button size='icon' variant='outline' className='h-6 w-6'>
                    <ChevronRight className='h-3.5 w-3.5' />
                    <span className='sr-only'>Next Order</span>
                  </Button>
                </PaginationItem>
              </PaginationContent>
            </Pagination>
          </CardFooter>
        </Card>
      </div>
    </>
  );
}
