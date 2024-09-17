import { Button } from '@/components/ui/button';
import { apiService } from '@/services/api.service';
import { useActions } from '@/store/store';
import { Download, Upload } from 'lucide-react';
import { useState } from 'react';
import { useNewDataNotification } from './hooks/useNewDataNotification';

export const SaveOnCloud = () => {
  const [uploading, setUploading] = useState(false);
  const [downloading, setDownloading] = useState(false);
  const { setRegisters, getRegisters } = useActions();

  const handleDowload = async () => {
    setDownloading(true);
    try {
      const data = await apiService.get();

      if (data) {
        setRegisters(data.incomes, data.expenses, data.investments);
      }
    } finally {
      setDownloading(false);
    }
  };

  const { publish } = useNewDataNotification(handleDowload);

  const handleUpload = async () => {
    setUploading(true);
    const data = getRegisters();
    try {
      await apiService.save(data);
      await publish();
    } finally {
      setUploading(false);
    }
  };

  return (
    <div className="flex">
      <Button variant="ghost" className="disabled:text-stone-200 px-2 md:px-4" disabled={downloading} onClick={handleDowload}>
        <Download />
      </Button>
      <Button variant="ghost" className="disabled:text-stone-200 px-2 md:px-4" disabled={uploading} onClick={handleUpload}>
        <Upload />
      </Button>
    </div>
  );
};
