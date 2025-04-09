import { CsvDropZone } from "@/modules/data-analysis/components/csv-drop-zone/csv-drop-zone";
import { Button } from "@/components/ui/button";
import { useCsvFileHandler } from "./hooks/useCsvFileHandler";
import { Dashboard } from "./features/dashboard/dashboard";

export const DataAnalysis = () => {
    const { csv, cacheFile, retrieveFile } = useCsvFileHandler();
    return (
        <>
            <div className="flex w-full justify-end content-center px-2 py-4">
                <Button onClick={retrieveFile}>Download</Button>
            </div>

            {csv ? <div className="w-full">
                <Dashboard data={csv} />
            </div>
                : <CsvDropZone onDrop={cacheFile} />}
        </>
    )
}