const escapeString = (item: unknown): string => {
  const type = typeof item;
  switch (type) {
    case 'string':
      return `${item}`;
    case 'object':
      return `${JSON.stringify(item)}`;

    default:
      return item as string;
  }
};

const isEmptyValue = (value: unknown) => value === null || value === undefined || Number.isNaN(value);

const serializeValue = (value: unknown, delimiter = ',') => {
  if (isEmptyValue(value)) return '';
  const val = escapeString(value);
  if (val.includes(delimiter) || val.includes('\n') || val.includes('"'))
    return `"${val.replace(/"/g, '""').replace(/\n/g, '\\n')}"`;
  return val;
};

const serializeRow = (row: string[], delimiter = ',') => row.map((value) => serializeValue(value)).join(delimiter);

const extractHeaders = <T extends Record<string, any>>(arr: T[]): string[] => [
  ...arr.reduce((acc, obj) => {
    Object.keys(obj).forEach((key) => acc.add(key));
    return acc;
  }, new Set<string>())
];

const convertCsv = <T extends Record<string, any> = Record<string, any>>(
  arr: T[],
  headers = extractHeaders(arr),
  omitHeaders = false
) => {
  const headerRow = serializeRow(headers);
  const bodyRows = arr.map((obj) => serializeRow(headers.map((key) => obj[key])));
  return omitHeaders ? bodyRows.join('\n') : [headerRow, ...bodyRows].join('\n');
};

export const objectToCSV = <T extends Record<string, any> = Record<string, any>>(data: T[]): Promise<string | null> => {
  const { promise, resolve, reject } = Promise.withResolvers<string | null>();
  if (!data || !Array.isArray(data) || data.length < 1) reject(null);

  resolve(convertCsv(data));
  return promise;
};
