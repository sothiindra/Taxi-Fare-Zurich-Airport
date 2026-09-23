import { env, hasHereApiKey } from '@/config/env';
import { ZURICH_AIRPORT } from '@/constants/app';
import type { AppLanguage, DestinationSuggestion, RouteMetrics } from '@/types/location';

const HERE_AUTOSUGGEST_URL = 'https://autosuggest.search.hereapi.com/v1/autosuggest';
const HERE_LOOKUP_URL = 'https://lookup.search.hereapi.com/v1/lookup';
const HERE_ROUTES_URL = 'https://router.hereapi.com/v8/routes';

type HereAddress = {
  label?: string;
  countryName?: string;
  city?: string;
  district?: string;
  street?: string;
  houseNumber?: string;
};

type HereAutosuggestItem = {
  id?: string;
  title?: string;
  address?: HereAddress;
};

type HereAutosuggestResponse = {
  items?: HereAutosuggestItem[];
};

type HereLookupResponse = {
  position?: {
    lat?: number;
    lng?: number;
  };
};

type HereRouteSection = {
  summary?: {
    length?: number;
    duration?: number;
    baseDuration?: number;
  };
};

type HereRoutesResponse = {
  routes?: Array<{
    sections?: HereRouteSection[];
  }>;
};

function getLanguageCode(language: AppLanguage): string {
  return language === 'de' ? 'de-CH' : 'en-US';
}

function ensureApiKey() {
  if (!hasHereApiKey) {
    throw new Error('missing_api_key');
  }
}

function buildUrl(baseUrl: string, parameters: Record<string, string>): string {
  const query = Object.entries(parameters)
    .map(([key, value]) => `${encodeURIComponent(key)}=${encodeURIComponent(value)}`)
    .join('&');

  return `${baseUrl}?${query}`;
}

function getSuggestionTitle(item: HereAutosuggestItem): string {
  const address = item.address;
  const streetAddress = [address?.street, address?.houseNumber].filter(Boolean).join(' ');

  return streetAddress || address?.city || address?.district || item.title || '';
}

function getSuggestionSubtitle(item: HereAutosuggestItem, title: string): string {
  const address = item.address;
  const location = [address?.city, address?.countryName].filter(Boolean).join(', ');

  return location && location !== title ? location : address?.label ?? '';
}

async function fetchJson<T>(url: string, errorCode: string): Promise<T> {
  const response = await fetch(url);

  if (!response.ok) {
    throw new Error(errorCode);
  }

  return response.json() as Promise<T>;
}

export async function fetchDestinationSuggestions(
  input: string,
  language: AppLanguage,
): Promise<DestinationSuggestion[]> {
  ensureApiKey();

  const url = buildUrl(HERE_AUTOSUGGEST_URL, {
    q: input,
    at: `${ZURICH_AIRPORT.latitude},${ZURICH_AIRPORT.longitude}`,
    lang: getLanguageCode(language),
    limit: '6',
    apiKey: env.hereApiKey,
  });
  const data = await fetchJson<HereAutosuggestResponse>(url, 'autocomplete_failed');

  return (data.items ?? [])
    .map((item): DestinationSuggestion | null => {
      if (!item.id) {
        return null;
      }

      const fullText = item.address?.label ?? item.title ?? '';
      const title = getSuggestionTitle(item);

      if (!fullText || !title) {
        return null;
      }

      return {
        id: item.id,
        title,
        subtitle: getSuggestionSubtitle(item, title),
        fullText,
      };
    })
    .filter((item): item is DestinationSuggestion => item !== null);
}

async function fetchDestinationCoordinates(
  destinationId: string,
  language: AppLanguage,
): Promise<{ latitude: number; longitude: number }> {
  const url = buildUrl(HERE_LOOKUP_URL, {
    id: destinationId,
    lang: getLanguageCode(language),
    apiKey: env.hereApiKey,
  });
  const data = await fetchJson<HereLookupResponse>(url, 'destination_lookup_failed');
  const latitude = data.position?.lat;
  const longitude = data.position?.lng;

  if (typeof latitude !== 'number' || typeof longitude !== 'number') {
    throw new Error('destination_lookup_failed');
  }

  return { latitude, longitude };
}

export async function fetchRouteMetrics(
  destination: DestinationSuggestion,
  language: AppLanguage,
): Promise<RouteMetrics> {
  ensureApiKey();

  const coordinates = await fetchDestinationCoordinates(destination.id, language);
  const url = buildUrl(HERE_ROUTES_URL, {
    transportMode: 'car',
    origin: `${ZURICH_AIRPORT.latitude},${ZURICH_AIRPORT.longitude}`,
    destination: `${coordinates.latitude},${coordinates.longitude}`,
    return: 'summary',
    lang: getLanguageCode(language),
    apiKey: env.hereApiKey,
  });
  const data = await fetchJson<HereRoutesResponse>(url, 'route_failed');
  const sections = data.routes?.[0]?.sections;

  if (!sections?.length) {
    throw new Error('route_unavailable');
  }

  const metrics = sections.reduce(
    (total, section) => {
      const summary = section.summary;

      if (!summary || typeof summary.length !== 'number' || typeof summary.duration !== 'number') {
        return total;
      }

      return {
        distanceMeters: total.distanceMeters + summary.length,
        durationSeconds: total.durationSeconds + summary.duration,
        staticDurationSeconds:
          total.staticDurationSeconds + (summary.baseDuration ?? summary.duration),
      };
    },
    { distanceMeters: 0, durationSeconds: 0, staticDurationSeconds: 0 },
  );

  if (metrics.distanceMeters <= 0 || metrics.durationSeconds <= 0) {
    throw new Error('route_unavailable');
  }

  return metrics;
}
