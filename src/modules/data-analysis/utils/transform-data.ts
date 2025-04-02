import { sum } from "@/lib/utils";
import { Register } from "@/types/register.types";
import { format, getYear, toDate } from "date-fns";
import { Summary } from "../types/summary";
import { CSVtoObject } from "./csv-to-object";

type Records = {
    incomes: Register[], expenses: Register[], investments: Register[]
}
function getDate(refDate: string) {
    const [year, month] = refDate.split('-')

    return toDate(new Date(+year, +month - 1, 1))
}

function getValues(type: 'incomes' | 'expenses' | 'investments', records: Records, date: Date) {
    return {
        type: type,
        total: sum(records[type]),
        year: format(date, 'yyyy'),
        month: format(date, 'MMMM'),
        ...(records[type]),
    }
}

export async function transformData(csvData: string): Promise<Summary> {
    const data = CSVtoObject<{ id: string, records: string, date: string }>(csvData);
    const summary = []

    for (const item of data) {
        const date = getDate(item.date);
        const records = JSON.parse(item.records) as { incomes: Register[], expenses: Register[], investments: Register[] };
        const incomes = getValues('incomes', records, date);
        const expenses = getValues('expenses', records, date);
        const investments = getValues('investments', records, date);
        console.log(incomes, expenses, investments)
        summary.push(incomes, expenses, investments)

    }

    // const groupByYear = Object.groupBy(Object.values(data), (item) => getYear(getDate(item.date)))
    // for (const [year, values] of Object.entries(groupByYear)) {
    //     const summaryByMonth: Summary[] = []
    //     for (const item of values ?? []) {
    //         const date = getDate(item.date);

    //         summaryByMonth.push({
    //             incomes,
    //             expenses,
    //             investments,
    //             date
    //         })
    //     }

    //     const sorted = summaryByMonth.toSorted((a, b) => a.date.getTime() - b.date.getTime())
    //     summary[year] = {
    //         ...sorted
    //     }

    // }

    return summary as any
}