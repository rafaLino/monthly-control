import { Register } from '@/types/register.types'
import { type ClassValue, clsx } from "clsx"
import { twMerge } from "tailwind-merge"

const numberFormatter = new Intl.NumberFormat('pt-BR', { style: 'currency', currency: 'BRL' })

export function cn(...inputs: ClassValue[]) {
  return twMerge(clsx(inputs))
}


export function capitalize(value: string | undefined) {
  if (!value) return ''
  return value.charAt(0).toUpperCase() + value.slice(1)
}


export function formatCurrency(value: number | undefined) {
  if (!value && value !== 0) return ''
  return numberFormatter.format(value)
}


export function generateId() {
  return crypto.randomUUID();
}

export function sum(list: Register[]) {
  return list.reduce((acc, { value }) => acc + value, 0)
}

export function getPercentage(value: number | undefined) {
  if (!value) return '0.00%';
  return (value * 100).toFixed(2) + '%';
}