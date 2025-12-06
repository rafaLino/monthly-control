import { Button } from '@/components/ui/button';
import { useEffect } from 'react';
import { useTranslation } from 'react-i18next';
import { toast } from 'sonner';
type Props = {
  show: boolean;
  onAction: () => Promise<void>;
};
export function OutdatedDataNotification({ show, onAction }: Props) {
  const { t } = useTranslation();

  useEffect(() => {
    if (show) {
      const timeout = setTimeout(() => {
        toast.info(t('notification.title'), {
          duration: Infinity,
          action: (
            <Button size="sm" variant="outline" aria-label="download" onClick={onAction}>
              {t('notification.action')}
            </Button>
          )
        });
      }, 1_000);
      return () => clearTimeout(timeout);
    }
  }, [show, toast]);

  return null;
}
