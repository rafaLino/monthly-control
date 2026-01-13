import { CurrencyItem } from '@/components/currency-item';
import { Badge } from '@/components/ui/badge';
import { Button } from '@/components/ui/button';
import { Card } from '@/components/ui/card';
import { Table, TableBody, TableCell, TableHead, TableHeader, TableRow } from '@/components/ui/table';
import { sumItems } from '@/lib/utils';
import { AddInput } from '@/modules/planner/components/add-input';
import { EditableCell, EditableNumberCell } from '@/modules/planner/features/data-table/components/editable-cell';
import { createLazyFileRoute } from '@tanstack/react-router';
import { Percent, UserPlus, XCircle } from 'lucide-react';
import { createContext, FC, Fragment, MouseEvent, useActionState, useContext, useMemo, useState } from 'react';
import { Translation, useTranslation } from 'react-i18next';
import {
  Dialog,
  DialogClose,
  DialogContent,
  DialogDescription,
  DialogFooter,
  DialogHeader,
  DialogTitle,
  DialogTrigger,
} from "@/components/ui/dialog"
import { Input } from "@/components/ui/input"
import { Label } from "@/components/ui/label"
export const Route = createLazyFileRoute('/_main/bills')({
  component: RouteComponent,
})

type Bill = {
  id: string;
  name: string;
  amount: number;
  tags: string[];
}

type User = {
  id: string;
  name: string;
  amount: number;
}

const mock = [{
  id: '1',
  name: 'Sample Bill',
  amount: 1257,
  tags: ['tag1', 'tag2']
}, {
  id: '2',
  name: 'Another Bill',
  amount: 1256,
  tags: ['tag3']
}, {
  id: '3',
  name: 'Third Bill',
  amount: 1257,
  tags: ['tag1']
},
{
  id: '4',
  name: 'Fourth Bill',
  amount: 1257,
  tags: ['tag2', 'tag3']
}, {
  id: '5',
  name: 'Fifth Bill',
  amount: 1257,
  tags: ['tag1', 'tag4']
}, {
  id: '6',
  name: 'Sixth Bill',
  amount: 1257,
  tags: ['tag2']
}, {
  id: '7',
  name: 'Seventh Bill',
  amount: 1257,
  tags: ['tag3', 'tag4']
}, {
  id: '8',
  name: 'Eighth Bill',
  amount: 1257,
  tags: ['tag1']
}, {
  id: '9',
  name: 'Ninth Bill',
  amount: 1257,
  tags: ['tag2', 'tag4']
}, {
  id: '10',
  name: 'Tenth Bill',
  amount: 1254,
  tags: ['tag3']
}
]

const usersMock = [
  { id: 'u1', name: 'Alice', amount: 11400 },
  { id: 'u2', name: 'Bob', amount: 7700 }
]

function RouteComponent() {
  return (
    <main className="grid grid-rows-1 grid-cols-1 min-h-full h-full gap-4 px-2 sm:grid-cols-3 sm:grid-rows-3 sm:px-4 sm:h-[calc(100vh-90px)]">
      <BillsProvider bills={mock} users={usersMock}>
        <Card className='h-full p-2 row-span-1 sm:row-span-3 overflow-hidden flex flex-col'>
          <BillsTable data={mock} onChange={console.log} onRemove={console.log} />
        </Card>
        <Card className='p-2'>
          <BudgetContent users={usersMock} />
        </Card>
        <Card className='p-2'>
          <UsersContent data={usersMock} />
        </Card>
        <Card className='p-2 col-span-1 row-span-1 sm:row-span-2 sm:col-span-2'>tags content</Card>
      </BillsProvider>
    </main>
  )
}

export const BillsTable: FC<{
  data: Bill[],
  onRemove?: (event: MouseEvent<HTMLButtonElement>) => void,
  onChange?: (id: string, field: keyof Bill, value: string | number) => void
}> = ({ data, onChange, onRemove }) => {
  const { calculateBillPercentage } = useBills();
  return (
    <div className='grid grid-rows-[auto_1fr] h-full gap-2 overflow-hidden'>
      <AddInput id="add-bill" onAdd={console.log} />
      <Table parentClassName='h-190 overflow-auto' className='w-full'>
        <TableHeader className='sticky bg-secondary top-0'>
          <TableRow >
            <TableHead className='w-80'>Name</TableHead>
            <TableHead>Amount</TableHead>
            <TableHead>%</TableHead>
            <TableHead className='w-0'></TableHead>
          </TableRow>
        </TableHeader>
        <TableBody>
          {data.map((bill) => (
            <TableRow key={bill.id}>
              <TableCell className='px-2'>
                <EditableCell id={`name-${bill.id}`} value={bill.name} onBlur={(newValue) => onChange?.(bill.id, 'name', newValue)} />
              </TableCell>
              <TableCell>
                <EditableNumberCell id={`amount-${bill.id}`} value={bill.amount} onBlur={(newValue) => onChange?.(bill.id, 'amount', newValue)} />
              </TableCell>
              <TableCell>
                <PercentBadge value={calculateBillPercentage(bill)} />
              </TableCell>
              <TableCell className='group'>
                <Button variant="link" size="icon" className='cursor-pointer sm:invisible group-hover:visible' data-id={bill.id} onClick={onRemove}>
                  <XCircle className='size-4' />
                </Button>
              </TableCell>
            </TableRow>
          ))}
        </TableBody>
      </Table>
    </div>
  )
}

const PercentBadge: FC<{ value: number }> = ({ value }) => {
  return (
    <Badge variant="secondary">
      <Translation>{(t) => t('percentage', { value })}</Translation>
    </Badge>
  )
}

const BudgetContent: FC<{
  users: User[]
}> = ({ users }) => {
  const { t } = useTranslation('translation')
  const { percentage, remaining, bills, incomes, incomesPerYear, billsPerYear, remainingPerYear, calculateUserShare } = useBills();
  const [fund] = useState<number>(150000);
  return (
    <div className='grid grid-cols-3 gap-4 px-2 justify-between text-zinc-600 dark:text-zinc-300'>
      <div className='flex flex-col gap-1 items-center'>
        <span className='font-medium'>Incomes</span>
        <CurrencyItem value={incomes} className='text-lg font-semibold' />
        <CurrencyItem title="year" value={incomesPerYear} className='text-xs font-semibold' />
      </div>
      <div className='flex flex-col gap-1 items-center'>
        <span className='font-medium'>Bills</span>
        <CurrencyItem value={bills} className='text-lg font-semibold' prefix='-' color={{ true: 'text-red-400' }} />
        <CurrencyItem title="year" value={billsPerYear} className='text-xs font-semibold' prefix="-" color={{ true: 'text-red-400' }} />
      </div>
      <div className='flex flex-col gap-1 items-center'>
        <span className='font-medium'>Remaining</span>
        <CurrencyItem value={remaining} className='text-lg font-semibold' color={{ true: 'text-sky-400' }} />
        <CurrencyItem title="year" value={remainingPerYear} className='text-xs font-semibold' color={{ true: 'text-sky-400' }} />
      </div>

      <hr className='col-span-3 w-full' />

      <div title="How much fixed expenses affect your budget" className='flex flex-col gap-2 items-center justify-center text-amber-600'>
        <Percent className='size-4' />
        <span className='font-medium'>{t('percentage', { value: percentage })}</span>
      </div>
      <div className='col-span-2 flex justify-around w-full gap-1 items-center'>
        {users.map(user => (
          <div key={user.id} className='flex flex-col gap-1 '>
            <span className='font-medium text-xs text-amber-400'>{user.name}</span>
            <CurrencyItem value={calculateUserShare(user)} color={{ true: 'text-amber-400' }} />
          </div>
        ))}
      </div>

      <hr className='col-span-3 w-full' />

      <div className='flex flex-col items-center relative'>
        <span title="Fund" className='text-lg font-medium'>{t('currency', { value: fund })}</span>
        <div className='flex justify-around gap-1 w-full absolute -bottom-2 sm:-bottom-4'>
          <CurrencyItem title="Current" value={fund / 12} className='text-[10px] font-semibold' color={{ true: 'text-amber-400' }} />
          <CurrencyItem title='Ideal' value={billsPerYear / 12} className='text-[10px] font-semibold' color={{ true: 'text-sky-400' }} />
        </div>
      </div>


      <div className='col-start-3 flex flex-col justify-center items-center'>
        <CurrencyItem value={fund - billsPerYear} className='text-lg font-semibold' />
      </div>
    </div>
  )
}

const UsersContent: FC<{
  data: User[]
}> = ({ data }) => {
  const { incomes, bills, remaining, calculateUserShare, calculateUserRemaining } = useBills();
  return (
    <div className='grid grid-cols-auto sm:grid-cols-4 px-2 sm:px-4 gap-2 sm:gap-4 items-center h-full text-zinc-600 dark:text-zinc-300 relative'>
      {data.map(user => (
        <Fragment key={user.id}>
          <h1 className='font-semibold'>{user.name}</h1>
          <CurrencyItem value={user.amount} className='font-medium' />
          <CurrencyItem value={calculateUserShare(user)} className='font-medium text-sm' color={{ true: 'text-amber-400' }} />
          <CurrencyItem value={calculateUserRemaining(user)} className='font-medium text-sm' color={{ true: 'text-sky-400' }} />
        </Fragment>
      ))}

      <hr className='col-span-4 w-full' />


      <AddUserDialog />
      <CurrencyItem value={incomes} className='text-lg font-semibold' />
      <CurrencyItem value={bills} color={{ true: 'text-amber-400' }} className='text-lg font-semibold' />
      <CurrencyItem value={remaining} color={{ true: 'text-sky-400' }} className='text-lg font-semibold' />

    </div>
  )
}

const AddUserDialog = () => {
  return (
    <Dialog>
      <DialogTrigger asChild>
        <Button type="button" variant="outline" size="icon" className='rounded-full cursor-pointer'>
          <UserPlus className='size-4' />
        </Button>
      </DialogTrigger>
      <UserDialogContentForm />
    </Dialog>
  )
}

const add = async (state: string | null, formData: FormData) => {
  console.log('Submitting form with data:', formData.get('name'));
  console.log('Current state:', state);
  await new Promise(resolve => {
    setTimeout(resolve, 2000);
  });

  return 'it works!'
}

const UserDialogContentForm = () => {
  const [state, formAction, isPending] = useActionState(add, null);
  return (
    <DialogContent className="sm:max-w-[425px]">
      <form action={formAction} >
        <DialogHeader>
          <DialogTitle>Create User</DialogTitle>
          <DialogDescription>
            Make changes to your user here. Click save when you&apos;re
            done.
          </DialogDescription>
        </DialogHeader>
        <div className="grid gap-4">
          <div className="grid gap-3">
            <Label htmlFor="name">Name</Label>
            <Input id="name" name="name" />
          </div>
          <div className="grid gap-3">
            <Label htmlFor="amount">Amount</Label>
            <Input id="amount" name="amount" type='number' />
          </div>
          <div className="grid gap-3">
            <Label htmlFor="tags">Tags</Label>
            <Input id="tags" name="tags" />
          </div>
        </div>
        <DialogFooter className='mt-4 items-center'>
          {isPending ? 'Saving...' : state}
          <DialogClose asChild>
            <Button type="button" variant="outline">Cancel</Button>
          </DialogClose>
          <Button type="submit">Save changes</Button>
        </DialogFooter>
      </form>
    </DialogContent>
  )
}


function computeBills(bills: Bill[], users: User[]) {
  const totalBills = sumItems(bills, bill => bill.amount);
  const totalIncomes = sumItems(users, user => user.amount);
  const remaining = totalIncomes - totalBills;
  const billsPercentage = totalBills / totalIncomes;

  const billsPerYear = totalBills * 12;
  const incomesPerYear = totalIncomes * 12;
  const remainingPerYear = incomesPerYear - billsPerYear;

  const calculateUserShare = (user: User) => {
    return user.amount * billsPercentage;
  }

  const calculateUserRemaining = (user: User) => {
    return user.amount - calculateUserShare(user);
  }

  const calculateBillPercentage = (bill: Bill) => {
    return bill.amount / totalBills;
  }

  return {
    bills: totalBills,
    incomes: totalIncomes,
    remaining,
    percentage: billsPercentage,
    remainingPerYear,
    incomesPerYear,
    billsPerYear,
    calculateUserShare,
    calculateUserRemaining,
    calculateBillPercentage
  };


}

const BillsContext = createContext({} as ReturnType<typeof computeBills>);

export const BillsProvider: FC<{
  bills: Bill[];
  users: User[];
  children: React.ReactNode;
}> = ({ bills, users, children }) => {
  const computed = useMemo(() => computeBills(bills, users), [bills, users]);
  return <BillsContext.Provider value={computed}>{children}</BillsContext.Provider>;
};

const useBills = () => {
  return useContext(BillsContext);
}