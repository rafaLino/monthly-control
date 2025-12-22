import { MouseEvent, createContext, useContext } from 'react';

export type DataTableMenuContext = {
  onClick?: (event: MouseEvent<HTMLButtonElement>) => void;
};
export const DataTableMenuContext = createContext({} as DataTableMenuContext);

export const useDataTableMenu = () => {
  const context = useContext(DataTableMenuContext);
  if (!context) {
    throw new Error('useDataTableMenu must be used within a DataTable Menu Provider');
  }
  return context;
};
