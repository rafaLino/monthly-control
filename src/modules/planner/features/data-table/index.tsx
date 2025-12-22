import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card';
import { getColorClasses } from '@/lib/colors';
import { useRegisterSum, useRegisters } from '@/store';
import { RegisterType } from '@/types/register.types';
import { MouseEvent, PropsWithChildren } from 'react';
import { useTranslation } from 'react-i18next';
import RegisterTable from './components/register-table';

type DataTableProps = PropsWithChildren<{
  type: RegisterType;
  onMenuClick?: (e: MouseEvent<HTMLButtonElement>, type: RegisterType) => void;
}>;
export const DataTable: React.FC<DataTableProps> = ({ type, children }) => {
  const { t } = useTranslation();
  const [data, setData] = useRegisters(type);
  const sum = useRegisterSum<number>(type);
  const { text, border } = getColorClasses(type);
  return (
    <Card className={border}>
      <CardHeader className="px-7 pb-0 flex-row justify-between items-center">
        <CardTitle data-testid="data_table:total" className={text}>
          {t('currency', { value: sum })}
        </CardTitle>
        {children}
      </CardHeader>
      <CardContent className="pb-4">
        <RegisterTable data={data} onChange={setData} total={sum} />
      </CardContent>
    </Card>
  );
};
