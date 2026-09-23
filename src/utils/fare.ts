import { TARIFF } from '@/constants/tariff';
import type { FareBreakdown, RouteMetrics } from '@/types/location';

function roundCurrency(value: number): number {
  return Math.round(value * 100) / 100;
}

export function calculateFare(route: RouteMetrics): FareBreakdown {
  const distanceKm = route.distanceMeters / 1000;
  const durationMinutes = route.durationSeconds / 60;
  const distanceCost = roundCurrency(distanceKm * TARIFF.perKilometer);
  const timeCost = roundCurrency(durationMinutes * TARIFF.perMinute);
  const total = roundCurrency(TARIFF.baseFare + distanceCost + timeCost);

  return {
    baseFare: roundCurrency(TARIFF.baseFare),
    distanceCost,
    timeCost,
    total,
    distanceKm,
    durationMinutes,
  };
}
