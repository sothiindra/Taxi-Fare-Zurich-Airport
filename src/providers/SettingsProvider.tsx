import { createContext, PropsWithChildren, useContext, useEffect, useMemo, useState } from 'react';
import i18n from 'i18next';

import type { AppLanguage, DestinationSuggestion } from '@/types/google';
import {
  clearRecentDestinationsStorage,
  loadRecentDestinations,
  loadStoredLanguage,
  saveRecentDestination,
  saveStoredLanguage,
} from '@/services/storage';

type SettingsContextValue = {
  language: AppLanguage;
  ready: boolean;
  recentDestinations: DestinationSuggestion[];
  setLanguage: (language: AppLanguage) => Promise<void>;
  addRecentDestination: (destination: DestinationSuggestion) => Promise<void>;
  clearRecentDestinations: () => Promise<void>;
};

const SettingsContext = createContext<SettingsContextValue | undefined>(undefined);

export function SettingsProvider({ children }: PropsWithChildren) {
  const [language, setLanguageState] = useState<AppLanguage>('de');
  const [recentDestinations, setRecentDestinations] = useState<DestinationSuggestion[]>([]);
  const [ready, setReady] = useState(false);

  useEffect(() => {
    async function hydrate() {
      const [storedLanguage, storedRecentDestinations] = await Promise.all([
        loadStoredLanguage(),
        loadRecentDestinations(),
      ]);

      const nextLanguage = storedLanguage ?? 'de';
      setLanguageState(nextLanguage);
      setRecentDestinations(storedRecentDestinations);
      await i18n.changeLanguage(nextLanguage);
      setReady(true);
    }

    void hydrate();
  }, []);

  const value = useMemo<SettingsContextValue>(
    () => ({
      language,
      ready,
      recentDestinations,
      setLanguage: async (nextLanguage) => {
        setLanguageState(nextLanguage);
        await saveStoredLanguage(nextLanguage);
        await i18n.changeLanguage(nextLanguage);
      },
      addRecentDestination: async (destination) => {
        const next = await saveRecentDestination(destination);
        setRecentDestinations(next);
      },
      clearRecentDestinations: async () => {
        await clearRecentDestinationsStorage();
        setRecentDestinations([]);
      },
    }),
    [language, ready, recentDestinations],
  );

  return <SettingsContext.Provider value={value}>{children}</SettingsContext.Provider>;
}

export function useSettings() {
  const context = useContext(SettingsContext);

  if (!context) {
    throw new Error('useSettings must be used within SettingsProvider');
  }

  return context;
}
