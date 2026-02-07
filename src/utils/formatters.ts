import { type ClassValue, clsx } from 'clsx';
import { twMerge } from 'tailwind-merge';

export function cn(...inputs: ClassValue[]) {
  return twMerge(clsx(inputs));
}

export function formatPrice(priceInCents: number): string {
  const reais = Math.floor(priceInCents / 100);
  const centavos = priceInCents % 100;
  
  return `${reais},${centavos.toString().padStart(2, '0')}`;
}

export function parsePriceToCents(priceString: string): number {
  // Remove tudo que não é número
  const numbersOnly = priceString.replace(/\D/g, '');
  
  if (!numbersOnly) return 0;
  
  // Se tem apenas 1 ou 2 dígitos, assume que são reais
  if (numbersOnly.length <= 2) {
    return parseInt(numbersOnly) * 100;
  }
  
  // Caso contrário, os últimos 2 dígitos são centavos
  return parseInt(numbersOnly);
}

export function formatPriceInput(value: string): string {
  // Remove tudo que não é número
  const numbersOnly = value.replace(/\D/g, '');
  
  if (!numbersOnly) return '';
  
  const cents = parsePriceToCents(numbersOnly);
  return formatPrice(cents);
}

export function formatDate(date: Date): string {
  return new Intl.DateTimeFormat('pt-BR').format(date);
}

export function formatDateTime(date: Date): string {
  return new Intl.DateTimeFormat('pt-BR', {
    dateStyle: 'short',
    timeStyle: 'short',
  }).format(date);
}
