import { toFile } from '@/lib/utils';

export const saveFile = async (content: string, fileName = 'result.csv') => {
  const blob = toFile(content);

  const supportsFileSystemAccess = 'showSaveFilePicker' in window;
  // If the File System Access API is supported…
  if (supportsFileSystemAccess) {
    try {
      const handle = await window.showSaveFilePicker({
        suggestedName: fileName
      });

      const writable = await handle.createWritable();
      await writable.write(blob);
      await writable.close();
      return;
    } catch (error) {
      if (error instanceof Error && error.name === 'AbortError') {
        console.info('canceled by user');
        return;
      }
    }
  }

  const url = URL.createObjectURL(blob);
  const a = document.createElement('a');
  a.href = url;
  a.download = fileName;
  a.click();
  URL.revokeObjectURL(url);
  a.remove();
};
