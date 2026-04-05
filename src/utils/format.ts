import type { AppLanguage } from '@/types/google';

const localeMap: Record<AppLanguage, string> = {
  de: 'de-CH',
  en: 'en-CH',
};

export function formatChf(value: number, language: AppLanguage): string {
  return new Intl.NumberFormat(localeMap[language], {
    style: 'currency',
    currency: 'CHF',
    minimumFractionDigits: 2,
    maximumFractionDigits: 2,
  }).format(value);
}

export function formatDistanceKm(value: number, language: AppLanguage): string {
  return new Intl.NumberFormat(localeMap[language], {
    minimumFractionDigits: 1,
    maximumFractionDigits: 1,
  }).format(value) + ' km';
}

export function formatMinutes(value: number, language: AppLanguage): string {
  const roundedMinutes = Math.max(1, Math.round(value));
  return language === 'de' ? `${roundedMinutes} Min.` : `${roundedMinutes} min`;
}
