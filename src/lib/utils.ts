import { Register } from '@/types/register.types';
import { type ClassValue, clsx } from 'clsx';
import { twMerge } from 'tailwind-merge';

export function cn(...inputs: ClassValue[]) {
  return twMerge(clsx(inputs));
}

export function capitalize(value: string | undefined) {
  if (!value) return '';
  return value.charAt(0).toUpperCase() + value.slice(1);
}

export function generateId() {
  return crypto.randomUUID();
}

export function sum(list: Register[]) {
  return list.reduce((acc, { value }) => acc + value, 0);
}

export function removeAccents(texto: string) {
  return texto
    .normalize('NFD')
    .replace(/[\u0300-\u036f]/g, '')
    .replace(/\s+/g, '_');
}

export function transformObjectIntoArray<TValue = string>(values: Object): Array<{ key: string; value: TValue }> {
  return Object.entries(values).map(([key, value]) => ({ key, value }));
}

export function replaceSpacesWithUnderscores(text: string): string {
  return text.replace(/\s+/g, '_');
}

export function updateItemOfArray<T>(array: Array<T>, index: number, item: Partial<T>): Array<T> {
  return replaceItemOfArray(array, index, { ...array[index], ...item });
}

export function replaceItemOfArray<T>(array: Array<T>, index: number, item: T): Array<T> {
  return [...array.slice(0, index), item, ...array.slice(index + 1)];
}
