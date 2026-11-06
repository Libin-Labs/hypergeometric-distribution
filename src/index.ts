function finite(value: number, min = -Number.MAX_VALUE, max = Number.MAX_VALUE): number {
  if (typeof value !== 'number' || !Number.isFinite(value))
    throw new TypeError('Expected finite number');
  if (value < min || value > max) throw new RangeError('Number outside supported bounds');
  return value;
}
function integer(value: number, min = 0, max = 1000000): number {
  if (!Number.isSafeInteger(value)) throw new RangeError('Expected safe integer');
  return finite(value, min, max);
}
function logChoose(n: number, k: number): number {
  if (k < 0 || k > n) return -Infinity;
  k = Math.min(k, n - k);
  let sum = 0;
  for (let i = 1; i <= k; i++) sum += Math.log(n - k + i) - Math.log(i);
  return sum;
}
function params(population: number, successes: number, draws: number): void {
  integer(population, 1, 10000);
  integer(successes, 0, population);
  integer(draws, 0, population);
}
export function hypergeometricPmf(
  k: number,
  population: number,
  successes: number,
  draws: number,
): number {
  params(population, successes, draws);
  integer(k, 0, 10000);
  if (k > successes || k > draws || draws - k > population - successes) return 0;
  return Math.exp(
    logChoose(successes, k) +
      logChoose(population - successes, draws - k) -
      logChoose(population, draws),
  );
}
export function hypergeometricMoments(
  population: number,
  successes: number,
  draws: number,
): { mean: number; variance: number } {
  params(population, successes, draws);
  const p = successes / population;
  return {
    mean: draws * p,
    variance:
      population === 1 ? 0 : (draws * p * (1 - p) * (population - draws)) / (population - 1),
  };
}
