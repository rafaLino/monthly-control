const deserializeRow = (row: string, delimiter = ',') => {
    const values = [];
    let index = 0, matchStart = 0, isInsideQuotations = false;
    while (true) {
        if (index === row.length) {
            values.push(row.slice(matchStart, index));
            break;
        }
        const char = row[index];
        if (char === delimiter && !isInsideQuotations) {
            values.push(
                row
                    .slice(matchStart, index)
                    .replace(/^"|"$/g, '')
                    .replace(/""/g, '"')
                    .replace(/\\n/g, '\n')
            );
            matchStart = index + 1;
        }
        if (char === '"')
            if (row[index + 1] === '"') index += 1;
            else isInsideQuotations = !isInsideQuotations;
        index += 1;
    }
    return values;
};

export const deserializeCSV = (data: string, delimiter = ',') =>
    data.split('\n').map(row => deserializeRow(row, delimiter));

export const CSVToArray = (data: string, delimiter = ',', omitHeader = false) => {
    const rows = data.split('\n');
    if (omitHeader) rows.shift();
    return rows.map(row => deserializeRow(row, delimiter));
};

export const CSVtoObject = <T = Record<string, any>>(data: string, delimiter = ',') => {
    const rows = data.split('\n');
    const headers = deserializeRow(rows.shift()!, delimiter);
    return rows.map((row) => {
        const values = deserializeRow(row, delimiter);
        return headers.reduce((obj, key, index) => {
            (obj as any)[key] = values[index];
            return obj;
        }, {} as T);
    });
};