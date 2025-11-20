import { useLocalStorage } from '@/hooks/useLocalStorage';
import { Alert } from './components/alert';

export function RegisterAccess() {
  const [accessName, setAccessName] = useLocalStorage('access_name');
  const displayAlert = !accessName;

  return displayAlert ? <Alert onClick={setAccessName} /> : null;
}
