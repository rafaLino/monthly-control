import { ChartConfig } from "@/components/ui/chart";

export type MetadataType = 'groupPerMonth' | 'groupPerYear'

export interface Metadata<T = any> {
    data: Array<T>,
    config: ChartConfig,
    dataKey: string,
    type: MetadataType
}

