import { Register, RegisterType } from '@/types/register.types';
import { useCallback, useMemo, useState } from 'react';

export function useSearchInput(data: { incomes: Register[]; expenses: Register[]; investments: Register[] }) {
  const [searchValue, setSearchValue] = useState('');

  const onSearch = useCallback((event: React.ChangeEvent<HTMLInputElement>) => {
    setSearchValue(event.target.value);
  }, []);

  const filter = useCallback(
    (type: RegisterType) => {
      const values = data[type].filter((i) => i.name.toLowerCase().includes(searchValue.toLowerCase()));
      return values.length > 0 ? values : data[type];
    },
    [data, searchValue]
  );

  const filteredData = useMemo(() => {
    return {
      incomes: filter('incomes'),
      expenses: filter('expenses'),
      investments: filter('investments')
    };
  }, [filter]);

  return [
    filteredData,
    {
      searchValue,
      onSearch
    }
  ] as const;
}
