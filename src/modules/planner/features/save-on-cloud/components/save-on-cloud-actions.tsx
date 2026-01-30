import { DotIndicator } from '@/components/dot-indicator/dot-indicator';
import { Button } from '@/components/ui/button';
import { useCheckOutdatedData } from '@/hooks/useCheckOutdatedData';
import { saveRegisters } from '@/lib/fetch-registers';
import { apiService } from '@/services/api.service';
import { useActions, useTemporalStore } from '@/store';
import { Download, Upload } from 'lucide-react';
import { useState } from 'react';
import { updateLastAccess } from '../actions/update-last-access';
import { OutdatedDataNotification } from './outdated-data-notification';

export const SaveOnCloudActions = () => {
  return (
    <div className="flex">
      <DownloadButton />
      <UploadButton />
    </div>
  );
};

const DownloadButton = () => {
  const [downloading, setDownloading] = useState(false);
  const { setRegisters } = useActions();
  const { isOutdated, setIsOutdated } = useCheckOutdatedData();
  const clear = useTemporalStore((state) => state.clear);

  const handleDowload = async () => {
    setDownloading(true);
    try {
      const data = await apiService.get();

      if (data) {
        setRegisters(data.incomes, data.expenses, data.investments);
        await saveRegisters(data);
        setIsOutdated(false);
        clear();
      }
    } finally {
      setDownloading(false);
    }
  };
  return (
    <>
      <OutdatedDataNotification show={isOutdated} onAction={handleDowload} />
      <Button variant="ghost" className="disabled:text-stone-200 px-2 md:px-4" disabled={downloading} onClick={handleDowload}>
        <Download />
      </Button>
    </>
  );
};

const UploadButton = () => {
  const [uploading, setUploading] = useState(false);
  const hasChanges = useTemporalStore((state) => !!state.pastStates.length);

  const clear = useTemporalStore((state) => state.clear);
  const { getRegisters } = useActions();

  const handleUpload = async () => {
    setUploading(true);
    const data = getRegisters();
    try {
      await Promise.all([apiService.save(data), updateLastAccess()]);
      clear();
    } finally {
      setUploading(false);
    }
  };

  return (
    <Button variant="ghost" className="relative disabled:text-stone-200 px-2 md:px-4" disabled={uploading} onClick={handleUpload}>
      <Upload />
      <DotIndicator className="size-2" active={hasChanges} animate />
    </Button>
  );
};
