import { useSettingsForm } from '@/modules/settings/components/setting-form/settings-form-hook';
import { useTranslation } from 'react-i18next';
import { ParamsFormField } from './params-form-field';

export function ParamsForm() {
  const { t } = useTranslation('translation', { keyPrefix: 'paramsSettings' });
  const { enabled } = useSettingsForm();
  return (
    <div className="flex flex-col gap-4">
      <div className="flex flex-row gap-4">
        <ParamsFormField label={t('autoDownload')} name="automatic_download" disabled={!enabled} type="checkbox" />
        <ParamsFormField label={t('autoSave')} name="auto_save" disabled={!enabled} type="checkbox" />
      </div>
      <div className="flex flex-row gap-6 items-center">
        <ParamsFormField label={t('aiAssistant')} name="ai_assistant" disabled={!enabled} type="checkbox" />
        <ParamsFormField name="ai_model" disabled={!enabled} type="text" placeholder={t('aiModel')} />
      </div>
      <div className="flex flex-row gap-6">
        <ParamsFormField label={t('defaultWaitingTime')} name="default_waiting_time_for_generate_csv" disabled={!enabled} />
        <ParamsFormField label={t('gridCol')} name="grid_col" disabled={!enabled} maxLength={5} />
      </div>
    </div>
  );
}
