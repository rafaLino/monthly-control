import { Card } from '@/components/ui/card';
import { QueryKeys } from '@/types/queryKeys';
import { useSuspenseQuery } from '@tanstack/react-query';
import { BillsProvider } from './context/provider';
import { BillsSummary } from './features/summary';
import { BillsTable } from './features/table';
import { BillsTags } from './features/tags';
import { BillsUsers } from './features/users';
import { useBillsMutation } from './queries/useBillsMutation';
import { billsService } from './services/bills.service';

export const BillsModule = () => {
  const { data: billsData } = useSuspenseQuery({
    queryKey: [QueryKeys.bills],
    queryFn: billsService.get
  });

  const { data: usersData } = useSuspenseQuery({
    queryKey: [QueryKeys.usersBills],
    queryFn: billsService.getUsers
  });

  const [save, update, remove] = useBillsMutation();

  return (
    <main className="grid grid-rows-1 grid-cols-1 min-h-full h-full gap-4 px-2 sm:grid-cols-3 sm:grid-rows-3 sm:px-4 sm:h-[calc(100vh-90px)]">
      <BillsProvider bills={billsData} users={usersData}>
        <Card className="h-full p-2 row-span-1 sm:row-span-3 overflow-hidden flex flex-col">
          <BillsTable data={billsData} onAdd={save} onChange={update} onRemove={remove} />
        </Card>
        <Card className="p-2">
          <BillsSummary users={usersData} />
        </Card>
        <Card className="p-2">
          <BillsUsers data={usersData} />
        </Card>
        <Card className="p-2 col-span-1 row-span-1 sm:row-span-2 sm:col-span-2">
          <BillsTags data={billsData} />
        </Card>
      </BillsProvider>
    </main>
  );
};
