import { cn } from '@/lib/utils';
import { FC, ReactNode } from 'react';
import { useTranslation } from 'react-i18next';

type HeaderContentProps = {
  isNoGroupColumn: boolean;
  bulletActive: boolean;
  value: number;
  name: string;
  Menu: ReactNode;
  Result: ReactNode;
  onBulletClick?: () => void;
};
export const HeaderContent: FC<HeaderContentProps> = ({
  isNoGroupColumn,
  bulletActive,
  value,
  name,
  Menu,
  Result,
  onBulletClick
}) => {
  const { t } = useTranslation('translation');
  return (
    <>
      <div className="flex items-center justify-between">
        <div className="flex gap-1 items-center">
          {!isNoGroupColumn && <span>{t('currency', { value })}</span>}
          <span>{value ? `(${name})` : name}</span>
        </div>
        {isNoGroupColumn && (
          <button className={cn('h-2 w-2 rounded-full', bulletActive ? 'bg-green-500' : 'bg-gray-500')} onClick={onBulletClick} />
        )}
        {!isNoGroupColumn && Menu}
      </div>
      {!isNoGroupColumn && Result}
    </>
  );
};
