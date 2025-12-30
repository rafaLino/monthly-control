import { paramsService } from '@/services/params.service';

export function updateLastAccess() {
  const accessName = localStorage.getItem('access_name');
  if (!accessName) return Promise.reject(new Error('No access name found'));

  return paramsService.saveParams({
    name: 'last_updated_access',
    value: accessName,
    type: 'string'
  });
}
