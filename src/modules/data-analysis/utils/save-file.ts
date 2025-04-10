

export const saveFile = async (fileName: string, content: string) => {
    const blob = new Blob([content], { type: 'text/csv;charset=utf-8;' });

    const supportsFileSystemAccess =
        'showSaveFilePicker' in window
    // If the File System Access API is supported…
    if (supportsFileSystemAccess) {
        const handle = await window.showSaveFilePicker({
            suggestedName: fileName,
        });

        const writable = await handle.createWritable();
        await writable.write(blob);
        await writable.close();
        return;

    }

    const url = URL.createObjectURL(blob);
    const a = document.createElement('a');
    a.href = url;
    a.download = fileName;
    a.click();
    URL.revokeObjectURL(url);
    a.remove();
};