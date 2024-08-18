import { type ClassValue, clsx } from "clsx"
import { twMerge } from "tailwind-merge"

export function cn(...inputs: ClassValue[]) {
  return twMerge(clsx(inputs))
}


export function capitalize(value: string | undefined) {
  if (!value) return ''
  return value.charAt(0).toUpperCase() + value.slice(1)
}