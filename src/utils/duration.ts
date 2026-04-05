export function parseGoogleDuration(duration: string): number {
  return Number.parseFloat(duration.replace('s', ''));
}
