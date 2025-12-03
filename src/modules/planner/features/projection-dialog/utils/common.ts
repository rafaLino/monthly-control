import { Column } from './types';

export const descending = (a: Column, b: Column) => b.value - a.value;
