import AsyncStorage from '@react-native-async-storage/async-storage';

import { MAX_RECENT_DESTINATIONS, STORAGE_KEYS } from '@/constants/app';
import type { AppLanguage, DestinationSuggestion } from '@/types/google';

export async function loadStoredLanguage(): Promise<AppLanguage | null> {
  const value = await AsyncStorage.getItem(STORAGE_KEYS.language);
  return value === 'de' || value === 'en' ? value : null;
}

export async function saveStoredLanguage(language: AppLanguage): Promise<void> {
  await AsyncStorage.setItem(STORAGE_KEYS.language, language);
}

export async function loadRecentDestinations(): Promise<DestinationSuggestion[]> {
  const value = await AsyncStorage.getItem(STORAGE_KEYS.recentDestinations);
  if (!value) {
    return [];
  }

  try {
    const parsed = JSON.parse(value) as DestinationSuggestion[];
    return Array.isArray(parsed) ? parsed : [];
  } catch {
    return [];
  }
}

export async function saveRecentDestination(
  destination: DestinationSuggestion,
): Promise<DestinationSuggestion[]> {
  const current = await loadRecentDestinations();
  const deduplicated = current.filter((item) => item.placeId !== destination.placeId);
  const next = [destination, ...deduplicated].slice(0, MAX_RECENT_DESTINATIONS);
  await AsyncStorage.setItem(STORAGE_KEYS.recentDestinations, JSON.stringify(next));
  return next;
}

export async function clearRecentDestinationsStorage(): Promise<void> {
  await AsyncStorage.removeItem(STORAGE_KEYS.recentDestinations);
}
