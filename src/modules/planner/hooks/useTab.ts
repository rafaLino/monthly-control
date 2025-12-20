import { RegisterType } from '@/types/register.types';
import { getRouteApi } from '@tanstack/react-router';

const route = getRouteApi('/_main/');

export function useTab(defaultTab: RegisterType = 'incomes') {
  const tab = route.useSearch({ select: (state) => state.tab ?? defaultTab });
  const navigate = route.useNavigate();

  const setTab = (value: RegisterType) => {
    navigate({ search: (old) => ({ ...old, tab: value as RegisterType }) });
  };

  return [tab, setTab] as const;
}
