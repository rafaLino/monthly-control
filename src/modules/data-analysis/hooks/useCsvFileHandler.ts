import { useRef, useState } from "react";

function resolveCsv(file: File | undefined): Promise<string | null> {
    return new Promise((resolve) => {
        if (!file)
            resolve(null)

        const reader = new FileReader();
        reader.onload = () => {
            resolve(reader.result as string)
        }
        reader.onerror = () => resolve(null)

        reader.readAsText(file as File);
    })
}

export function useCsvFileHandler() {
    const csvFile = useRef<File | null>(null);
    const [csv, setCsv] = useState<string | null>(null)

    const cacheFile = async (file: File | undefined) => {
        if (!file) return
        csvFile.current = file
        setCsv(await resolveCsv(file))
    }

    const retrieveFile = async () => {
        if (csvFile.current) {
            setCsv(await resolveCsv(csvFile.current));
        }
    }


    return {
        csv,
        cacheFile,
        retrieveFile
    }
}