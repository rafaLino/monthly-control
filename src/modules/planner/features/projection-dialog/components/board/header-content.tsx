import { FC, ReactNode } from 'react';
import { useTranslation } from 'react-i18next';

type HeaderContentProps = {
  isNotGrouped: boolean;
  value: number;
  name: string;
  Menu: ReactNode;
  Result: ReactNode;
};
export const HeaderContent: FC<HeaderContentProps> = ({ isNotGrouped, value, name, Menu, Result }) => {
  const { t } = useTranslation('translation');
  return (
    <>
      <div className="flex items-center justify-between">
        <div className="flex gap-1 items-center">
          {!isNotGrouped && <span>{t('currency', { value })}</span>}
          <span>{value ? `(${name})` : name}</span>
        </div>
        {isNotGrouped && <div className={'h-2 w-2 rounded-full bg-gray-500'} />}
        {Menu}
      </div>
      {Result}
    </>
  );
};
