import { SettingsForm } from '@/modules/settings/components/setting-form';
import { useLocalParamsAll } from '@/store';
import { LocalParams, Schema } from '@/types/local-params';
import { zodResolver } from '@hookform/resolvers/zod';
import { useForm } from 'react-hook-form';
import { ParamsForm } from './components/params-form';

export function SetLocalParams() {
  const [params, setParams] = useLocalParamsAll();

  const form = useForm<LocalParams>({
    resolver: zodResolver(Schema),
    defaultValues: params
  });

  const handleSubmit = (params: LocalParams) => {
    setParams(params);
  };

  return (
    <SettingsForm form={form} title="paramsSettings.title" description="paramsSettings.description" onSubmit={handleSubmit}>
      <ParamsForm />
    </SettingsForm>
  );
}
