import { Register } from "@/types/register.types";

interface SummaryValue {
    total: number;
    items: Register[],
}

export interface Summary extends Register {
    month: string
    year: string,
    type: string
}

