import type { ReturnPoint } from "../types";

interface Stats {
  min: number;
  max: number;
  mean: number;
}

export const computeVisibleStats = (points: ReturnPoint[]): Stats | null => {
  if (points.length === 0) return null;

  const values = points.map((point) => point.return);
  const min = Math.min(...values);
  const max = Math.max(...values);
  const mean = values.reduce((sum, value) => sum + value, 0) / values.length;

  return { min, max, mean };
};
