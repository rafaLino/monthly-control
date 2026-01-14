import { Card } from '@/components/ui/card';
import { BillsProvider } from './context/provider';
import { BillsSummary } from './features/summary';
import { BillsTable } from './features/table';
import { BillsTags } from './features/tags';
import { BillsUsers } from './features/users';
import { useBillsQuery } from './queries/useBillsMutation';
import { useUsersQuery } from './queries/useUsersMutation';

export const BillsModule = () => {
  const [billsData, save, update, remove] = useBillsQuery();

  const [usersData, saveUser, removeUser] = useUsersQuery();

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
          <BillsUsers data={usersData} onSave={saveUser} onRemove={removeUser} />
        </Card>
        <Card className="p-2 col-span-1 row-span-1 sm:row-span-2 sm:col-span-2">
          <BillsTags data={billsData} />
        </Card>
      </BillsProvider>
    </main>
  );
};

