import { CurrencyItem } from '@/components/currency-item';
import { Button } from '@/components/ui/button';
import { Dialog, DialogContent, DialogTrigger } from '@/components/ui/dialog';
import { MinusCircle, UserPlus } from 'lucide-react';
import { FC, Fragment } from 'react';
import { useBills } from '../../context/hooks/useBills';
import { Status, User } from '../../types';
import { UserForm } from './components/form';

export const BillsUsers: FC<{
  data: User[];
  onSave: (status: Status, data: FormData) => Promise<Status>;
  onRemove: (id: string) => void;
}> = ({ data, onSave, onRemove }) => {
  const { incomes, bills, remaining, calculateUserShare, calculateUserRemaining } = useBills();

  return (
    <div className="grid grid-cols-auto sm:grid-cols-4 justify-between px-2 sm:px-4 gap-2 sm:gap-4 items-center h-full text-zinc-600 dark:text-zinc-300 relative">
      {data.map((user) => (
        <Fragment key={user.id}>
          <div className="flex items-center font-semibold group">
            {user.name}
            <Button
              variant="link"
              className="text-red-500 cursor-pointer invisible group-hover:visible"
              size="icon"
              onClick={() => onRemove(user.id)}
            >
              <MinusCircle className="size-4" />
            </Button>
          </div>
          <CurrencyItem value={user.amount} className="font-medium" />
          <CurrencyItem value={calculateUserShare(user)} className="font-medium text-sm" color={{ true: 'text-amber-400' }} />
          <CurrencyItem value={calculateUserRemaining(user)} className="font-medium text-sm" color={{ true: 'text-sky-400' }} />
        </Fragment>
      ))}

      <hr className="col-span-4 w-full" />

      <div className="flex flex-row justify-between gap-2 col-span-4">
        <Dialog>
          <DialogTrigger asChild>
            <Button type="button" variant="outline" size="icon" className="rounded-full cursor-pointer">
              <UserPlus className="size-4" />
            </Button>
          </DialogTrigger>
          <DialogContent className="sm:max-w-[425px]">
            <UserForm action={onSave} />
          </DialogContent>
        </Dialog>
        <CurrencyItem value={incomes} className="text-lg font-semibold" />
        <CurrencyItem value={bills} color={{ true: 'text-amber-400' }} className="text-lg font-semibold" />
        <CurrencyItem value={remaining} color={{ true: 'text-sky-400' }} className="text-lg font-semibold" />
      </div>
    </div>
  );
};
