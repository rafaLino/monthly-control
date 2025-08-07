import { Register, RegisterType } from '@/types/register.types';
import { useCallback, useMemo, useState } from 'react';

export function useFilterInput(data: { incomes: Register[]; expenses: Register[]; investments: Register[] }) {
  const [value, setValue] = useState('');

  const onFilter = useCallback((event: React.ChangeEvent<HTMLInputElement>) => {
    setValue(event.target.value);
  }, []);

  const filter = useCallback(
    (type: RegisterType) => {
      const values = data[type].filter((i) => i.name.toLowerCase().includes(value.toLowerCase()));
      return values.length > 0 ? values : data[type];
    },
    [data, value]
  );

  const filteredData = useMemo(() => {
    return {
      incomes: filter('incomes'),
      expenses: filter('expenses'),
      investments: filter('investments')
    };
  }, [filter]);

  return [filteredData, value, onFilter] as const;
}
