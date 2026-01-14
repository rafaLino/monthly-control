import { Card } from "@/components/ui/card"
import { BillsProvider } from "./context/provider"
import { BillsTable } from "./features/table"
import { billsMock, usersMock } from "./types/mock"
import { BillsSummary } from "./features/summary"
import { BillsUsers } from "./features/users"
import { BillsTags } from "./features/tags"

export const BillsModule = () => {
    return (
        <main className="grid grid-rows-1 grid-cols-1 min-h-full h-full gap-4 px-2 sm:grid-cols-3 sm:grid-rows-3 sm:px-4 sm:h-[calc(100vh-90px)]">
            <BillsProvider bills={billsMock} users={usersMock}>
                <Card className='h-full p-2 row-span-1 sm:row-span-3 overflow-hidden flex flex-col'>
                    <BillsTable data={billsMock} onChange={console.log} onRemove={console.log} />
                </Card>
                <Card className='p-2'>
                    <BillsSummary users={usersMock} />
                </Card>
                <Card className='p-2'>
                    <BillsUsers data={usersMock} />
                </Card>
                <Card className='p-2 col-span-1 row-span-1 sm:row-span-2 sm:col-span-2'>
                    <BillsTags />
                </Card>
            </BillsProvider>
        </main>
    )
}