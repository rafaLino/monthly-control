import { ChartConfig } from '@/components/ui/chart';
import { sum } from '@/lib/utils';
import { Register } from '@/types/register.types';
import { getYear, toDate } from 'date-fns';
import { Metadata } from '../types/metadata';
import { CSVtoObject } from './csv-to-object';

type Records = {
  incomes: Register[];
  expenses: Register[];
  investments: Register[];
};

type Items = Records & { date: Date };

function getDate(refDate: string) {
  const [year, month] = refDate.split('-');

  return toDate(new Date(+year, +month - 1, 1));
}

const METADATAS_FN = [
  createGroupPerMonthMetadata,
  createGroupPerYearMetadata,
  createIncomesEvolutionMetadata,
  createIncomesEvolutionPerYearMetadata,
  createExpensesEvolutionMetadata,
  createExpensesEvolutionPerYearMetadata,
  createInvestmentsEvolutionMetadata,
  createInvestmentsEvolutionPerYearMetadata
];

export function generateMetadata(csv: string) {
  const items = convertToObject(csv);
  const result = [];
  for (const fn of METADATAS_FN) {
    result.push(fn(items));
  }

  return result;
}

function convertToObject(csv: string): Array<Items> {
  const data = CSVtoObject<{ id: string; records: string; date: string }>(csv);
  return data.map((item) => ({
    date: getDate(item.date),
    ...JSON.parse(item.records)
  }));
}

function createGroupPerMonthMetadata(
  items: Items[]
): Metadata<{ incomes: number; expenses: number; investments: number; date: Date }> {
  const data = items
    .map((item) => ({
      incomes: sum(item.incomes),
      expenses: sum(item.expenses),
      investments: sum(item.investments),
      date: item.date
    }))
    .toSorted((a, b) => a.date.getTime() - b.date.getTime());

  const config = {
    incomes: {
      label: 'incomes',
      color: 'hsl(var(--chart-2))'
    },
    expenses: {
      label: 'expenses',
      color: 'hsl(var(--chart-1))'
    },
    investments: {
      label: 'investments',
      color: 'hsl(var(--chart-4))'
    }
  } satisfies ChartConfig;

  return {
    data,
    config,
    dataKey: 'date',
    type: 'groupPerMonth'
  };
}

function createGroupPerYearMetadata(
  items: Items[]
): Metadata<{ incomes: number; expenses: number; investments: number; year: string }> {
  const monthly = items.map((item) => {
    return {
      incomes: sum(item.incomes),
      expenses: sum(item.expenses),
      investments: sum(item.investments),
      year: getYear(item.date)
    };
  });

  const group = Object.groupBy(monthly, ({ year }) => year);

  const data = Object.entries(group).map(([year, values]) => {
    const { incomes, expenses, investments } = values!.reduce(
      (acc, curr) => {
        return {
          incomes: acc.incomes + curr.incomes,
          expenses: acc.expenses + curr.expenses,
          investments: acc.investments + curr.investments
        };
      },
      { incomes: 0, expenses: 0, investments: 0 }
    );

    return {
      year,
      incomes,
      expenses,
      investments
    };
  });

  const config = {
    incomes: {
      label: 'incomes',
      color: 'hsl(var(--chart-2))'
    },
    expenses: {
      label: 'expenses',
      color: 'hsl(var(--chart-1))'
    },
    investments: {
      label: 'investments',
      color: 'hsl(var(--chart-4))'
    }
  } satisfies ChartConfig;

  return {
    data,
    config,
    dataKey: 'year',
    type: 'groupPerYear'
  };
}

function createIncomesEvolutionMetadata(items: Items[]): Metadata<{ incomes: number; date: Date }> {
  const data = items
    .map((item) => ({
      incomes: sum(item.incomes),
      date: item.date
    }))
    .toSorted((a, b) => a.date.getTime() - b.date.getTime());

  const config = {
    incomes: {
      label: 'incomes',
      color: 'hsl(var(--chart-2))'
    }
  } satisfies ChartConfig;

  return {
    data,
    config,
    dataKey: 'date',
    type: 'incomesMonthEvolution'
  };
}

function createExpensesEvolutionMetadata(items: Items[]): Metadata<{ expenses: number; date: Date }> {
  const data = items
    .map((item) => ({
      expenses: sum(item.expenses),
      date: item.date
    }))
    .toSorted((a, b) => a.date.getTime() - b.date.getTime());

  const config = {
    expenses: {
      label: 'expenses',
      color: 'hsl(var(--chart-1))'
    }
  } satisfies ChartConfig;

  return {
    data,
    config,
    dataKey: 'date',
    type: 'expensesMonthEvolution'
  };
}

function createInvestmentsEvolutionMetadata(items: Items[]): Metadata<{ investments: number; date: Date }> {
  const data = items
    .map((item) => ({
      investments: sum(item.investments),
      date: item.date
    }))
    .toSorted((a, b) => a.date.getTime() - b.date.getTime());

  const config = {
    investments: {
      label: 'investments',
      color: 'hsl(var(--chart-4))'
    }
  } satisfies ChartConfig;

  return {
    data,
    config,
    dataKey: 'date',
    type: 'investmentsMonthEvolution'
  };
}

function createIncomesEvolutionPerYearMetadata(items: Items[]): Metadata<{ incomes: number; year: string }> {
  const monthly = items.map((item) => {
    return {
      incomes: sum(item.incomes),
      year: getYear(item.date)
    };
  });

  const group = Object.groupBy(monthly, ({ year }) => year);

  const data = Object.entries(group).map(([year, values]) => {
    const incomes = values!.reduce((acc, curr) => acc + curr.incomes, 0);

    return {
      year,
      incomes
    };
  });

  const config = {
    incomes: {
      label: 'incomes',
      color: 'hsl(var(--chart-2))'
    }
  } satisfies ChartConfig;

  return {
    data,
    config,
    dataKey: 'year',
    type: 'incomesYearEvolution'
  };
}

function createExpensesEvolutionPerYearMetadata(items: Items[]): Metadata<{ expenses: number; year: string }> {
  const monthly = items.map((item) => {
    return {
      expenses: sum(item.expenses),
      year: getYear(item.date)
    };
  });

  const group = Object.groupBy(monthly, ({ year }) => year);

  const data = Object.entries(group).map(([year, values]) => {
    const expenses = values!.reduce((acc, curr) => acc + curr.expenses, 0);

    return {
      year,
      expenses
    };
  });

  const config = {
    expenses: {
      label: 'expenses',
      color: 'hsl(var(--chart-1))'
    }
  } satisfies ChartConfig;

  return {
    data,
    config,
    dataKey: 'year',
    type: 'expensesYearEvolution'
  };
}

function createInvestmentsEvolutionPerYearMetadata(items: Items[]): Metadata<{ investments: number; year: string }> {
  const monthly = items.map((item) => {
    return {
      investments: sum(item.investments),
      year: getYear(item.date)
    };
  });

  const group = Object.groupBy(monthly, ({ year }) => year);

  const data = Object.entries(group).map(([year, values]) => {
    const investments = values!.reduce((acc, curr) => acc + curr.investments, 0);

    return {
      year,
      investments
    };
  });

  const config = {
    investments: {
      label: 'investments',
      color: 'hsl(var(--chart-4))'
    }
  } satisfies ChartConfig;

  return {
    data,
    config,
    dataKey: 'year',
    type: 'investmentsYearEvolution'
  };
}
