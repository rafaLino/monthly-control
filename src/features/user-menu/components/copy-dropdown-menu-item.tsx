import { DropdownMenuItem } from '@/components/ui/dropdown-menu';
import { getReferenceDate } from '@/lib/get-reference-date';
import { apiService } from '@/services/api.service';
import { useContainsRegisters } from '@/store';
import { FC, PropsWithChildren } from 'react';
import { useTranslation } from 'react-i18next';
import { toast } from 'sonner';

const referenceDate = getReferenceDate();

export const CopyDropdownMenuItem: FC<PropsWithChildren> = ({ children }) => {
  const { t } = useTranslation('translation');
  const hasItems = useContainsRegisters();

  const show = referenceDate.hasNext && !hasItems;

  const handleCopy = async () => {
    toast.promise(apiService.copy, {
      loading: t('loading'),
      success: (copied) => {
        return copied ? t('notification.copiedSuccess') : t('notification.copiedError');
      },
      error: t('error')
    });
  };

  return show ? <DropdownMenuItem onClick={handleCopy}>{children}</DropdownMenuItem> : null;
};
