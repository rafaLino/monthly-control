import { DotIndicator } from '@/components/dot-indicator/dot-indicator';
import { Button } from '@/components/ui/button';
import { useDataVersion } from '@/hooks/useDataVersion';
import { saveRegisters } from '@/lib/fetch-registers';
import { apiService } from '@/services/api.service';
import { useActions } from '@/store';
import { Download, Upload } from 'lucide-react';
import { useState } from 'react';
import { OutdatedDataNotification } from './outdated-data-notification';

export const SaveOnCloudActions = () => {
  const [uploading, setUploading] = useState(false);
  const [downloading, setDownloading] = useState(false);
  const { setRegisters, getRegisters } = useActions();
  const { isLocalOutdated, isServerOutdated, syncServerVersion, syncLocalVersion } = useDataVersion();

  const handleDowload = async () => {
    setDownloading(true);
    try {
      const data = await apiService.get();

      if (data) {
        setRegisters(data.incomes, data.expenses, data.investments);
        await saveRegisters(data);
        syncLocalVersion();
      }
    } finally {
      setDownloading(false);
    }
  };

  const handleUpload = async () => {
    setUploading(true);
    const data = getRegisters();
    try {
      await apiService.save(data);
      syncServerVersion();
    } finally {
      setUploading(false);
    }
  };

  return (
    <div className="flex">
      <OutdatedDataNotification show={isLocalOutdated} onAction={handleDowload} />
      <Button variant="ghost" className="disabled:text-stone-200 px-2 md:px-4" disabled={downloading} onClick={handleDowload}>
        <Download />
      </Button>
      <Button
        variant="ghost"
        className="relative disabled:text-stone-200 px-2 md:px-4"
        disabled={uploading}
        onClick={handleUpload}
      >
        <DotIndicator active={isServerOutdated} animate />
        <Upload />
      </Button>
    </div>
  );
};
