import { env, hasGoogleMapsKey } from '@/config/env';
import { ZURICH_AIRPORT } from '@/constants/app';
import type { AppLanguage, DestinationSuggestion, RouteMetrics } from '@/types/google';
import { parseGoogleDuration } from '@/utils/duration';

const GOOGLE_PLACES_URL = 'https://places.googleapis.com/v1/places:autocomplete';
const GOOGLE_ROUTES_URL = 'https://routes.googleapis.com/directions/v2:computeRoutes';

function getLanguageCode(language: AppLanguage): string {
  return language === 'de' ? 'de' : 'en';
}

function ensureKey() {
  if (!hasGoogleMapsKey) {
    throw new Error('missing_api_key');
  }
}

function buildSessionToken() {
  return Math.random().toString(36).slice(2);
}

export async function fetchDestinationSuggestions(
  input: string,
  language: AppLanguage,
  sessionToken = buildSessionToken(),
): Promise<DestinationSuggestion[]> {
  ensureKey();

  const response = await fetch(GOOGLE_PLACES_URL, {
    method: 'POST',
    headers: {
      'Content-Type': 'application/json',
      'X-Goog-Api-Key': env.googleMapsApiKey,
      'X-Goog-FieldMask':
        'suggestions.placePrediction.placeId,suggestions.placePrediction.text.text,suggestions.placePrediction.structuredFormat.mainText.text,suggestions.placePrediction.structuredFormat.secondaryText.text',
    },
    body: JSON.stringify({
      input,
      sessionToken,
      languageCode: getLanguageCode(language),
      locationBias: {
        circle: {
          center: {
            latitude: ZURICH_AIRPORT.latitude,
            longitude: ZURICH_AIRPORT.longitude,
          },
          radius: 50000,
        },
      },
    }),
  });

  if (!response.ok) {
    throw new Error('autocomplete_failed');
  }

  const data = await response.json();

  return (data.suggestions ?? [])
    .map((item: any) => item.placePrediction)
    .filter(Boolean)
    .map((prediction: any): DestinationSuggestion => ({
      placeId: prediction.placeId,
      title:
        prediction.structuredFormat?.mainText?.text ??
        prediction.text?.text ??
        '',
      subtitle: prediction.structuredFormat?.secondaryText?.text ?? '',
      fullText: prediction.text?.text ?? '',
    }))
    .filter((item: DestinationSuggestion) => Boolean(item.placeId && item.fullText));
}

export async function fetchRouteMetrics(
  destination: DestinationSuggestion,
  language: AppLanguage,
): Promise<RouteMetrics> {
  ensureKey();

  const response = await fetch(GOOGLE_ROUTES_URL, {
    method: 'POST',
    headers: {
      'Content-Type': 'application/json',
      'X-Goog-Api-Key': env.googleMapsApiKey,
      'X-Goog-FieldMask': 'routes.distanceMeters,routes.duration,routes.staticDuration',
    },
    body: JSON.stringify({
      origin: {
        location: {
          latLng: {
            latitude: ZURICH_AIRPORT.latitude,
            longitude: ZURICH_AIRPORT.longitude,
          },
        },
      },
      destination: {
        placeId: destination.placeId,
      },
      travelMode: 'DRIVE',
      routingPreference: 'TRAFFIC_AWARE_OPTIMAL',
      languageCode: getLanguageCode(language),
      units: 'METRIC',
    }),
  });

  if (!response.ok) {
    throw new Error('route_failed');
  }

  const data = await response.json();
  const route = data.routes?.[0];

  if (!route?.distanceMeters || !route?.duration) {
    throw new Error('route_unavailable');
  }

  return {
    distanceMeters: route.distanceMeters,
    durationSeconds: parseGoogleDuration(route.duration),
    staticDurationSeconds: route.staticDuration
      ? parseGoogleDuration(route.staticDuration)
      : parseGoogleDuration(route.duration),
  };
}
