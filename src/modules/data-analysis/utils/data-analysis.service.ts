import { apiService } from '@/services/api.service'
import { generateMetadata } from './generate-metadata'
import { paramsService } from '@/services/params.service'
import { toDate } from 'date-fns'


export const downloadMetadata = async (signal: AbortSignal) => {

    const url = await apiService.download(signal)

    if (!url) {
        throw new Error('URL not found')
    }
    const response = await fetch(url, {
        method: 'GET',
        signal
    })
    if (!response.ok) {
        throw new Error('something went wrong')
    }
    const csv = await response.text()

    return generateMetadata(csv);
}

export const createMetadata = async () => {

    const url = await apiService.generate();

    if (!url) {
        throw new Error('URL not found')
    }
    const response = await fetch(url)

    if (!response.ok) {
        throw new Error('somthing went wrong')
    }
    const csv = await response.text()

    const metadata = generateMetadata(csv);

    paramsService.saveParams({ name: 'generated-metadata-timestamp', value: Date.now().toString(), type: 'timestamp' })

    return metadata;
}

export const fetchGeneratedMetadataTimestamp = async () => {
    const param = await paramsService.getParams('generated-metadata-timestamp')

    if (!param) {
        return;
    }

    if (param.type !== 'timestamp') {
        throw new Error('Invalid parameter type');
    }

    return toDate(parseInt(param.value))
}


