import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card';

import { formatCurrency } from '@/lib/utils';
import RegisterTable from './components/register-table';
import { COLORS, getColor } from '@/lib/colors';
import { useRegisters, useRegisterSum } from '@/store/store';

type DataTableProps = {
  type: 'incomes' | 'expenses' | 'investments';
};
export const DataTable: React.FC<DataTableProps> = ({ type }) => {
  const [data, setData] = useRegisters(type);
  const sum = useRegisterSum<string>(type, formatCurrency);
  const { text, border } = COLORS[getColor(type)];
  return (
    <Card className={border}>
      <CardHeader className='px-7 pb-0'>
        <CardTitle className={text}>{sum}</CardTitle>
      </CardHeader>
      <CardContent className='pb-4'>
        <RegisterTable data={data} onChange={setData} />
      </CardContent>
    </Card>
  );
};
