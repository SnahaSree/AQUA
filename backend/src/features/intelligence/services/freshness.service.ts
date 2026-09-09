export type PredictionFreshness =
  | "fresh"
  | "expiring"
  | "expired"
  | "unavailable";

export function getPredictionFreshness(
  generatedAt: Date | null,
  expiresAt: Date | null,
): PredictionFreshness {
  if (!generatedAt || !expiresAt) {
    return "unavailable";
  }

  const now = Date.now();

  const generated = generatedAt.getTime();
  const expires = expiresAt.getTime();

  if (expires <= now) {
    return "expired";
  }

  const totalLifetime = expires - generated;
  const remaining = expires - now;

  if (
    totalLifetime <= 0 ||
    remaining <= totalLifetime * 0.25
  ) {
    return "expiring";
  }

  return "fresh";
}