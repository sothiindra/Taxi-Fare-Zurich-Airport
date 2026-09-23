export type AppLanguage = 'de' | 'en';

export type DestinationSuggestion = {
  id: string;
  title: string;
  subtitle: string;
  fullText: string;
};

export type RouteMetrics = {
  distanceMeters: number;
  durationSeconds: number;
  staticDurationSeconds: number;
};

export type FareBreakdown = {
  baseFare: number;
  distanceCost: number;
  timeCost: number;
  total: number;
  distanceKm: number;
  durationMinutes: number;
};
