import { useSettingsForm } from '@/components/setting-form/settings-form-hook';
import { useTranslation } from 'react-i18next';
import { ParamsFormField } from './params-form-field';

export function ParamsForm() {
  const { t } = useTranslation('translation', { keyPrefix: 'paramsSettings' });
  const { enabled } = useSettingsForm();
  return (
    <div className="flex flex-col gap-4">
      <ParamsFormField label={t('disableAutoDownload')} name="disable_automatic_download" disabled={!enabled} type="checkbox" />

      <div className="flex flex-row gap-6">
        <ParamsFormField label={t('defaultWaitingTime')} name="default_waiting_time_for_generate_csv" disabled={!enabled} />
        <ParamsFormField label={t('gridCol')} name="grid_col" disabled={!enabled} maxLength={5} />
      </div>
    </div>
  );
}
