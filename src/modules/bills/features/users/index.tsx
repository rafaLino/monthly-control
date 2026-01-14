import { CurrencyItem } from "@/components/currency-item";
import { FC, Fragment } from "react";
import { useBills } from "../../context/hooks/useBills";
import { User } from "../../types";
import { AddUserDialog } from "./components/dialog";

export const BillsUsers: FC<{
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