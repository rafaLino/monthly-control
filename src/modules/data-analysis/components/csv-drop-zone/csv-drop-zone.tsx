import { FC } from "react"
import Dropzone from "react-dropzone"

type Props = {
    onDrop: (file: File | undefined) => void
}
export const CsvDropZone: FC<Props> = ({ onDrop }) => {
    const handleDrop = async (acceptedFiles: File[]) => {
        onDrop(acceptedFiles.at(0));
    }
    return (
        <Dropzone onDrop={handleDrop} accept={{ 'text/*': ['.csv'] }} maxFiles={1}>
            {({ getRootProps, getInputProps }) => (
                <section className='flex-1 w-full'>
                    <div {...getRootProps()}>
                        <input {...getInputProps()} />
                        <div className='flex w-full justify-center border-2 border-dashed p-10 border-gray-950 rounded-lg'>
                            <span>Drop your csv file here or <span className="text-blue-600">click to select</span></span>
                        </div>
                    </div>
                </section>
            )}
        </Dropzone>
    )
}