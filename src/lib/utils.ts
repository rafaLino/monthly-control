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

export function updateItemOfArray<T>(array: Array<T>, item: Partial<T>, predicate: (item: T) => boolean): Array<T> {
  const index = array.findIndex(predicate);
  return replaceItemOfArray(array, { ...array[index], ...item }, index);
}

export function replaceItemOfArray<T>(array: Array<T>, item: T, predicate: number | ((item: T) => boolean)): Array<T> {
  const index = typeof predicate === 'number' ? predicate : array.findIndex(predicate);
  return [...array.slice(0, index), item, ...array.slice(index + 1)];
}

export function addNewItemToArray<T>(array: Array<T>, item: T): Array<T> {
  return [...array, item];
}

export function addOrReplaceItemOfArray<T extends { id: string }>(
  array: Array<T>,
  predicate: (item: T) => boolean,
  item: T
): Array<T> {
  const index = array.findIndex(predicate);
  if (index >= 0) return replaceItemOfArray(array, item, index);

  return addNewItemToArray(array, item);
}

export function removeItemFromArray<T>(array: Array<T>, predicate: (item: T) => boolean): Array<T> {
  const index = array.findIndex(predicate);
  return [...array.slice(0, index), ...array.slice(index + 1)];
}

export function createNewRegister(name: string, value: number): Register {
  return {
    id: generateId(),
    checked: false,
    name,
    value
  };
}
