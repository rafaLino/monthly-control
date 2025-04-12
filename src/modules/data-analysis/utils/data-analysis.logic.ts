import { apiService } from '@/services/api.service';
import { paramsService } from '@/services/params.service';
import { QueryKeys } from '@/types/queryKeys';
import { toDate } from 'date-fns';
import { generateMetadata } from './generate-metadata';

export const downloadMetadata = async (signal: AbortSignal) => {
  const url = await apiService.download(signal);

  if (!url) {
    throw new Error('URL not found');
  }
  const response = await fetch(url, {
    method: 'GET',
    signal
  });
  if (!response.ok) {
    throw new Error('something went wrong');
  }
  const csv = await response.text();

  return { metadata: generateMetadata(csv), csv };
};

export const createMetadata = async () => {
  const url = await apiService.generate();

  if (!url) {
    throw new Error('URL not found');
  }
  const response = await fetch(url);

  if (!response.ok) {
    throw new Error('somthing went wrong');
  }
  const csv = await response.text();

  const metadata = generateMetadata(csv);

  paramsService.saveParams({ name: QueryKeys.generatedMetadataTimestamp, value: Date.now().toString(), type: 'timestamp' });

  return { metadata, csv };
};

export const fetchGeneratedMetadataTimestamp = async () => {
  const param = await paramsService.getParams(QueryKeys.generatedMetadataTimestamp);

  if (!param) {
    return null;
  }

  if (param.type !== 'timestamp') {
    throw new Error('Invalid parameter type');
  }

  return toDate(parseInt(param.value));
};
