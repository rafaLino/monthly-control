import { ToastAction } from '@/components/ui/toast';
import { useToast } from '@/components/ui/use-toast';
import { useEffect } from 'react';
import { useTranslation } from 'react-i18next';

type Props = {
  show: boolean;
  onAction: () => Promise<void>;
};
export function OutdatedDataNotification({ show, onAction }: Props) {
  const { t } = useTranslation();
  const { toast } = useToast();

  useEffect(() => {
    if (show) {
      const timeout = setTimeout(() => {
        toast({
          title: t('notification.title'),
          duration: Infinity,
          action: (
            <ToastAction altText="download" onClick={onAction}>
              {t('notification.action')}
            </ToastAction>
          )
        });
      }, 1_000);
      return () => clearTimeout(timeout);
    }
  }, [show, toast]);

  return null;
}
