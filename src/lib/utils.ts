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

export function isFalsy(value: unknown): boolean {
  return value === null || value === undefined;
}

export function isTruthy(value: unknown) {
  return !isFalsy(value);
}
