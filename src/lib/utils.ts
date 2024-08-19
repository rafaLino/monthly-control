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
  console.log(value)
  if (!value && value !== 0) return ''
  return numberFormatter.format(value)
}


