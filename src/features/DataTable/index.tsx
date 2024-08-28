import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card';

import RegisterTable from './components/register-table';
import { COLORS, getColor } from '@/lib/colors';
import { useRegisters, useRegisterSum } from '@/store/store';
import { useContext } from 'react';
import { DataTableFilterContext } from '@/context/DataTableFilterContext';
import { RegisterType } from '@/types/register.types';
import { useTranslation } from 'react-i18next';

type DataTableProps = {
  type: RegisterType;
};
export const DataTable: React.FC<DataTableProps> = ({ type }) => {
  const { t } = useTranslation();
  const filter = useContext(DataTableFilterContext);
  const [data, setData] = useRegisters(type);
  const sum = useRegisterSum<string>(type);
  const { text, border } = COLORS[getColor(type)];
  const filteredData = data.filter((item) => item.name.includes(filter));
  return (
    <Card className={border}>
      <CardHeader className='px-7 pb-0'>
        <CardTitle className={text}>{t('currency', { value: sum })}</CardTitle>
      </CardHeader>
      <CardContent className='pb-4'>
        <RegisterTable data={filteredData} onChange={setData} />
      </CardContent>
    </Card>
  );
};
