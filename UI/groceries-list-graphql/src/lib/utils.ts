import { clsx, type ClassValue } from "clsx"
import { twMerge } from "tailwind-merge"

export function cn(...inputs: ClassValue[]) {
  return twMerge(clsx(inputs))
}

export function skeletonUniqueId(): string{
  return `skeleton-row-${crypto.randomUUID()}`
}

export function createImageUrl(image: number[]){
  const uint8Array = new Uint8Array(image);
	return URL.createObjectURL(new Blob([uint8Array], { type: 'image/jpeg' }));
}