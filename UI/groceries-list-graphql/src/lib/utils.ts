import { clsx, type ClassValue } from "clsx"
import { twMerge } from "tailwind-merge"

export function cn(...inputs: ClassValue[]) {
  return twMerge(clsx(inputs))
}

export function skeletonUniqueId(): string{
  return `skeleton-row-${crypto.randomUUID()}`
}