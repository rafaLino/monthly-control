import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card';

import { Badge } from '@/components/ui/badge';
import { COLORS, getColor } from '@/lib/colors';
import { useRegisterSum, useRegisters } from '@/store';
import { RegisterType } from '@/types/register.types';
import { useTranslation } from 'react-i18next';
import RegisterTable from './components/register-table';

type DataTableProps = {
  type: RegisterType;
};
export const DataTable: React.FC<DataTableProps> = ({ type }) => {
  const { t } = useTranslation();
  const [data, setData] = useRegisters(type);
  const sum = useRegisterSum<number>(type);
  const { text, border } = COLORS[getColor(type)];
  return (
    <Card className={border}>
      <CardHeader className="px-7 pb-0 flex-row justify-between items-center">
        <CardTitle data-testid="data_table:total" className={text}>
          {t('currency', { value: sum })}
        </CardTitle>
        <Badge variant="secondary">{data.length}</Badge>
      </CardHeader>
      <CardContent className="pb-4">
        <RegisterTable data={data} onChange={setData} total={sum} />
      </CardContent>
    </Card>
  );
};
