import { CurrencyItem } from '@/components/currency-item';
import { User } from '@/modules/bills/types';
import { Percent } from 'lucide-react';
import { FC } from 'react';
import { useTranslation } from 'react-i18next';

export const UsersShare: FC<{
  users: User[];
  calculateUserShare: (user: User) => number;
  percentage: number;
}> = ({ users, calculateUserShare, percentage }) => {
  const { t } = useTranslation('translation');
  return (
    <>
      <div
        title="How much fixed expenses affect your budget"
        className="flex flex-col gap-2 items-center justify-center text-amber-600"
      >
        <Percent className="size-4" />
        <span className="font-medium">{t('percentage', { value: percentage })}</span>
      </div>
      <div className="col-span-2 flex justify-around w-full gap-1 items-center">
        {users.map((user) => (
          <div key={user.id} className="flex flex-col gap-1 ">
            <span className="font-medium text-xs text-amber-400">{user.name}</span>
            <CurrencyItem value={calculateUserShare(user)} color={{ true: 'text-amber-400' }} />
          </div>
        ))}
      </div>
    </>
  );
};
