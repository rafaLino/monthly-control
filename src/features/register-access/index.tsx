import { useLocalStorage } from '@/hooks/useLocalStorage';
import env from '@/lib/env';
import { Alert } from './components/alert';

export function RegisterAccess() {
  const [accessName, setAccessName] = useLocalStorage('access_name');
  const displayAlert = !accessName && env.VITE_ONLINE;

  return displayAlert ? <Alert onClick={setAccessName} /> : null;
}
