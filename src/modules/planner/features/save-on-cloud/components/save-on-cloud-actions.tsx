import { DotIndicator } from '@/components/dot-indicator/dot-indicator';
import { Button } from '@/components/ui/button';
import { useCheckOutdatedData } from '@/hooks/useCheckOutdatedData';
import { saveRegisters } from '@/lib/fetch-registers';
import { apiService } from '@/services/api.service';
import { useActions, useTemporalStore } from '@/store';
import { Download, Upload } from 'lucide-react';
import { useState } from 'react';
import { toast } from 'sonner';
import { updateLastAccess } from '../actions/update-last-access';
import { OutdatedDataNotification } from './outdated-data-notification';

export const SaveOnCloudActions = () => {
  const [uploading, setUploading] = useState(false);
  const [downloading, setDownloading] = useState(false);
  const { setRegisters, getRegisters } = useActions();
  const { isOutdated, setIsOutdated } = useCheckOutdatedData();
  const hasChanges = useTemporalStore((state) => !!state.pastStates.length);

  const handleDowload = async () => {
    setDownloading(true);
    try {
      const data = await apiService.get();

      if (data) {
        setRegisters(data.incomes, data.expenses, data.investments);
        await saveRegisters(data);
        setIsOutdated(false);
      }
    } finally {
      setDownloading(false);
      toast.dismiss();
    }
  };

  const handleUpload = async () => {
    setUploading(true);
    const data = getRegisters();
    try {
      await Promise.all([apiService.save(data), updateLastAccess()]);
    } finally {
      setUploading(false);
    }
  };

  return (
    <div className="flex">
      <OutdatedDataNotification show={isOutdated} onAction={handleDowload} />
      <Button variant="ghost" className="disabled:text-stone-200 px-2 md:px-4" disabled={downloading} onClick={handleDowload}>
        <Download />
      </Button>
      <Button
        variant="ghost"
        className="relative disabled:text-stone-200 px-2 md:px-4"
        disabled={uploading}
        onClick={handleUpload}
      >
        <Upload />
        <DotIndicator className="size-2" active={hasChanges} animate />
      </Button>
    </div>
  );
};
