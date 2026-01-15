import { Card } from '@/components/ui/card';
import { BillsProvider } from './context/provider';
import { BillsSummary } from './features/summary';
import { BillsTable } from './features/table';
import { BillsTags } from './features/tags';
import { BillsUsers } from './features/users';
import { useBillsQuery } from './queries/useBillsQuery';
import { useUsersQuery } from './queries/useUsersQuery';

export const BillsModule = () => {
  const [billsData, save, update, remove] = useBillsQuery();

  const [usersData, saveUser, removeUser] = useUsersQuery();

  return (
    <main className="grid grid-rows-1 grid-cols-1 h-full gap-4 p-2 sm:grid-cols-3 sm:grid-rows-3 sm:px-4">
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
