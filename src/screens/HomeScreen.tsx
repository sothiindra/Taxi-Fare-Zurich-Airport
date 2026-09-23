import { useEffect, useMemo, useState } from 'react';
import { Keyboard, StyleSheet, View } from 'react-native';
import { useTranslation } from 'react-i18next';

import { DestinationSearchCard } from '@/components/DestinationSearchCard';
import { InfoStateCard } from '@/components/InfoStateCard';
import { LocationSummaryCard } from '@/components/LocationSummaryCard';
import { PrimaryButton } from '@/components/PrimaryButton';
import { ResultCard } from '@/components/ResultCard';
import { ScreenBackground } from '@/components/ScreenBackground';
import { SectionTitle } from '@/components/SectionTitle';
import { SuggestionList } from '@/components/SuggestionList';
import { ZURICH_AIRPORT } from '@/constants/app';
import { useSettings } from '@/providers/SettingsProvider';
import { fetchDestinationSuggestions, fetchRouteMetrics } from '@/services/hereLocation';
import { calculateFare } from '@/utils/fare';
import type { DestinationSuggestion, FareBreakdown } from '@/types/location';

export function HomeScreen() {
  const { t } = useTranslation();
  const { language, recentDestinations, addRecentDestination, ready } = useSettings();
  const [query, setQuery] = useState('');
  const [selectedDestination, setSelectedDestination] = useState<DestinationSuggestion | null>(null);
  const [suggestions, setSuggestions] = useState<DestinationSuggestion[]>([]);
  const [loadingSuggestions, setLoadingSuggestions] = useState(false);
  const [loadingFare, setLoadingFare] = useState(false);
  const [errorCode, setErrorCode] = useState<string | null>(null);
  const [fareBreakdown, setFareBreakdown] = useState<FareBreakdown | null>(null);

  useEffect(() => {
    if (!ready) {
      return;
    }

    const trimmed = query.trim();

    if (selectedDestination && trimmed === selectedDestination.fullText) {
      return;
    }

    if (trimmed.length < 3) {
      setSuggestions([]);
      setLoadingSuggestions(false);
      return;
    }

    let isCancelled = false;
    const timeoutId = setTimeout(() => {
      void (async () => {
        try {
          setLoadingSuggestions(true);
          setErrorCode(null);
          const nextSuggestions = await fetchDestinationSuggestions(trimmed, language);
          if (!isCancelled) {
            setSuggestions(nextSuggestions);
          }
        } catch (error) {
          if (!isCancelled) {
            setErrorCode(error instanceof Error ? error.message : 'default');
            setSuggestions([]);
          }
        } finally {
          if (!isCancelled) {
            setLoadingSuggestions(false);
          }
        }
      })();
    }, 320);

    return () => {
      isCancelled = true;
      clearTimeout(timeoutId);
    };
  }, [query, language, ready, selectedDestination]);

  const canCalculate = Boolean(selectedDestination) && !loadingFare;
  const errorMessage = (() => {
    if (!errorCode) {
      return null;
    }

    switch (errorCode) {
      case 'missing_api_key':
      case 'autocomplete_failed':
      case 'destination_lookup_failed':
      case 'route_failed':
      case 'route_unavailable':
        return t(`home.errors.${errorCode}`);
      default:
        return t('home.errors.default');
    }
  })();

  const showSuggestionBlock = useMemo(() => {
    return query.trim().length >= 3 && !selectedDestination;
  }, [query, selectedDestination]);

  const showRecentDestinations = useMemo(() => {
    return !selectedDestination && query.trim().length === 0 && recentDestinations.length > 0;
  }, [query, recentDestinations.length, selectedDestination]);

  if (!ready) {
    return (
      <ScreenBackground>
        <InfoStateCard title={t('common.loading')} text={t('home.loadingText')} variant="loading" />
      </ScreenBackground>
    );
  }

  async function handleCalculate() {
    if (!selectedDestination) {
      return;
    }

    try {
      setLoadingFare(true);
      setErrorCode(null);
      const routeMetrics = await fetchRouteMetrics(selectedDestination, language);
      setFareBreakdown(calculateFare(routeMetrics));
      await addRecentDestination(selectedDestination);
    } catch (error) {
      setFareBreakdown(null);
      setErrorCode(error instanceof Error ? error.message : 'default');
    } finally {
      setLoadingFare(false);
    }
  }

  function handleQueryChange(value: string) {
    setQuery(value);
    setSelectedDestination(null);
    setFareBreakdown(null);
    setErrorCode(null);
  }

  function handleSelectSuggestion(suggestion: DestinationSuggestion) {
    Keyboard.dismiss();
    setSelectedDestination(suggestion);
    setQuery(suggestion.fullText);
    setSuggestions([]);
    setErrorCode(null);
  }

  function handleClearDestination() {
    setQuery('');
    setSelectedDestination(null);
    setSuggestions([]);
    setLoadingSuggestions(false);
    setFareBreakdown(null);
    setErrorCode(null);
  }

  return (
    <ScreenBackground>
      <SectionTitle
        eyebrow={t('common.airportValue')}
        title={t('home.heroTitle')}
        subtitle={t('home.heroSubtitle')}
      />

      <LocationSummaryCard
        label={t('common.airportLabel')}
        value={t('common.airportValue')}
        badge={ZURICH_AIRPORT.iataCode}
      />

      <DestinationSearchCard
        query={query}
        onChangeText={handleQueryChange}
        onClear={handleClearDestination}
        selectedLabel={selectedDestination ? t('common.validatedSelection') : undefined}
        suggestions={suggestions}
        showSuggestions={showSuggestionBlock}
        suggestionsEmptyLabel={loadingSuggestions ? t('home.suggestionsLoading') : t('home.noSuggestions')}
        onSelectSuggestion={handleSelectSuggestion}
      />

      {showRecentDestinations ? (
        <SuggestionList
          title={t('common.recentDestinations')}
          suggestions={recentDestinations}
          onSelect={handleSelectSuggestion}
        />
      ) : null}

      <PrimaryButton
        label={loadingFare ? t('common.calculating') : t('common.calculate')}
        onPress={handleCalculate}
        disabled={!canCalculate}
        loading={loadingFare}
      />

      <View style={styles.resultsArea}>
        {loadingFare ? (
          <InfoStateCard
            title={t('home.loadingTitle')}
            text={t('home.loadingText')}
            variant="loading"
          />
        ) : null}

        {!loadingFare && errorMessage ? (
          <InfoStateCard title={t('home.errors.default')} text={errorMessage} variant="error" />
        ) : null}

        {!loadingFare && !errorMessage && fareBreakdown ? (
          <ResultCard breakdown={fareBreakdown} language={language} />
        ) : null}

        {!loadingFare && !errorMessage && !fareBreakdown ? (
          <InfoStateCard title={t('home.emptyTitle')} text={t('home.emptyText')} />
        ) : null}
      </View>
    </ScreenBackground>
  );
}

const styles = StyleSheet.create({
  resultsArea: {
    gap: 16,
    zIndex: 1,
  },
});
