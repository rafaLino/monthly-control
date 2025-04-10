export function resolveCsv(file: File | undefined): Promise<string> {
    return new Promise((resolve, reject) => {
        if (!file)
            reject(new Error('File is undefined'))

        const reader = new FileReader();
        reader.onload = () => {
            resolve(reader.result as string)
        }
        reader.onerror = (e) => reject(new Error(e.target?.error?.message ?? 'An unknown error occurred'))

        reader.readAsText(file as File);
    })
}