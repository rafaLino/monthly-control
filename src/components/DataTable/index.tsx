import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card';

import { formatCurrency } from '@/lib/utils';
import RegisterTable from './components/register-table';
import { Register } from '@/types/register.types';
import { useMemo, useState } from 'react';
import { COLORS, ColorType } from '@/lib/colors';
function makeData() {
  const fakeData: Register[] = [];
  for (let i = 0; i < 30; i++) {
    const register: Register = {
      id: `ID ${i}`,
      name: `Name ${i}`,
      value: Math.random() * 100,
      checked: i % 2 === 0,
    };
    fakeData.push(register);
  }
  return fakeData;
}

type DataTableProps = {
  color: ColorType;
};
export const DataTable: React.FC<DataTableProps> = ({ color }) => {
  const [data, setData] = useState(makeData());
  const { text, border } = COLORS[color];
  const sum = useMemo(() => data.reduce((acc, { value }) => acc + value, 0), [data]);
  return (
    <Card className={border}>
      <CardHeader className='px-7'>
        <CardTitle className={text}>{formatCurrency(sum)}</CardTitle>
      </CardHeader>
      <CardContent>
        <RegisterTable data={data} onChange={setData} />
      </CardContent>
    </Card>
  );
};
