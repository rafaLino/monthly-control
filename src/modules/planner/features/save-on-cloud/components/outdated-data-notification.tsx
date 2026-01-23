import { useEffect, useEffectEvent } from 'react';
import { useTranslation } from 'react-i18next';
import { toast } from 'sonner';
type Props = {
  show: boolean;
  onAction: () => Promise<void>;
};
export function OutdatedDataNotification({ show, onAction }: Props) {
  const { t } = useTranslation('translation', { keyPrefix: 'notification' });

  const action = useEffectEvent(() => {
    onAction();
    toast.dismiss();
  });

  useEffect(() => {
    if (show) {
      const timeout = setTimeout(() => {
        toast.info(t('title'), {
          duration: Infinity,
          action: {
            label: t('action'),
            onClick: action
          }
        });
      }, 1_000);
      return () => clearTimeout(timeout);
    }
  }, [show, toast]);

  return null;
}
