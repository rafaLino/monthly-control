import { cn } from '@/lib/utils';
import { FC, ReactNode } from 'react';
import { useTranslation } from 'react-i18next';

type HeaderContentProps = {
  isNotGrouped: boolean;
  activeSnapshot: boolean;
  value: number;
  name: string;
  Menu: ReactNode;
  Result: ReactNode;
  onBulletClick?: () => void;
};
export const HeaderContent: FC<HeaderContentProps> = ({ isNotGrouped, activeSnapshot, value, name, Menu, Result, onBulletClick }) => {
  const { t } = useTranslation('translation');
  return (
    <>
      <div className="flex items-center justify-between">
        <div className="flex gap-1 items-center">
          {!isNotGrouped && <span>{t('currency', { value })}</span>}
          <span>{value ? `(${name})` : name}</span>
        </div>
        {isNotGrouped && <button className={cn('h-2 w-2 rounded-full', activeSnapshot ? 'bg-green-500' : 'bg-gray-500')} onClick={onBulletClick} />}
        {Menu}
      </div>
      {Result}
    </>
  );
};
