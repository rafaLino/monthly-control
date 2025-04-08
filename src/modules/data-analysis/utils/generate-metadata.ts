import { ChartConfig } from "@/components/ui/chart";
import { sum } from "@/lib/utils";
import { Register } from "@/types/register.types";
import { getYear, toDate } from "date-fns";
import { Metadata } from "../types/metadata";
import { CSVtoObject } from "./csv-to-object";


type Records = {
    incomes: Register[], expenses: Register[], investments: Register[]
}

type Items = Records & { date: Date }


function getDate(refDate: string) {
    const [year, month] = refDate.split('-')

    return toDate(new Date(+year, +month - 1, 1))
}



export function generateMetadata(csv: string) {
    const items = convertToObject(csv);
    const groupPerMonthMetadaDataPromise = groupPerMonth(items)
    const groupPerYearMetadataPromise = groupPerYear(items);
    return Promise.all([groupPerMonthMetadaDataPromise, groupPerYearMetadataPromise])
}


function convertToObject(csv: string): Array<Items> {
    const data = CSVtoObject<{ id: string, records: string, date: string }>(csv);
    return data.map(item => ({
        date: getDate(item.date),
        ...JSON.parse(item.records)
    }));
}

async function groupPerMonth(items: Items[]): Promise<Metadata<{ incomes: number, expenses: number, investments: number, date: Date }>> {
    const data = items.map((item) => ({
        incomes: sum(item.incomes),
        expenses: sum(item.expenses),
        investments: sum(item.investments),
        date: item.date
    })).toSorted((a, b) => a.date.getTime() - b.date.getTime())

    const config = {
        incomes: {
            "label": "Incomes",
            "color": "hsl(var(--chart-2))"
        },
        expenses: {
            "label": "Expenses",
            "color": "hsl(var(--chart-1))"
        },
        investments: {
            "label": "Investments",
            "color": "hsl(var(--chart-4))"
        },

    } satisfies ChartConfig

    return {
        data,
        config,
        dataKey: 'date',
        type: 'groupPerMonth'
    }
}

async function groupPerYear(items: Items[]): Promise<Metadata<{ incomes: number, expenses: number, investments: number, year: string }>> {
    const monthly = items.map((item) => {
        return ({
            incomes: sum(item.incomes),
            expenses: sum(item.expenses),
            investments: sum(item.investments),
            year: getYear(item.date)
        })
    })

    const group = Object.groupBy(monthly, ({ year }) => year)

    const data = Object.entries(group).map(([year, values]) => {
        const { incomes, expenses, investments } = values!.reduce((acc, curr) => {
            return {
                incomes: acc.incomes + curr.incomes,
                expenses: acc.expenses + curr.expenses,
                investments: acc.investments + curr.investments
            }
        }, { incomes: 0, expenses: 0, investments: 0 })

        return {
            year,
            incomes,
            expenses,
            investments
        }
    })

    const config = {
        incomes: {
            "label": "Incomes",
            "color": "hsl(var(--chart-2))"
        },
        expenses: {
            "label": "Expenses",
            "color": "hsl(var(--chart-1))"
        },
        investments: {
            "label": "Investments",
            "color": "hsl(var(--chart-4))"
        },

    } satisfies ChartConfig

    return {
        data,
        config,
        dataKey: 'year',
        type: 'groupPerYear'
    }
}