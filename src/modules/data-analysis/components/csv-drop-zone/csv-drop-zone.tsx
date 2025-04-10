import { FC } from 'react';
import Dropzone from 'react-dropzone';
import { Trans, useTranslation } from 'react-i18next';

type Props = {
  onDrop: (file: File | undefined) => void;
};
export const CsvDropZone: FC<Props> = ({ onDrop }) => {
  const { t } = useTranslation('translation', { keyPrefix: 'dashboard' });
  const handleDrop = async (acceptedFiles: File[]) => {
    onDrop(acceptedFiles.at(0));
  };
  return (
    <Dropzone onDrop={handleDrop} accept={{ 'text/*': ['.csv'] }} maxFiles={1}>
      {({ getRootProps, getInputProps }) => (
        <section className='flex w-4/5 mt-12 min-h-96 items-center justify-center border-2 border-dashed rounded-lg border-gray-500 text-gray-800 bg-slate-100/50 '>
          <div {...getRootProps()}>
            <input {...getInputProps()} />
            <span>
              <Trans t={t} i18nKey='dropZoneDescription' components={{ italic: <span className='text-blue-700 cursor-pointer' /> }} />
            </span>
          </div>
        </section>
      )}
    </Dropzone>
  );
};
