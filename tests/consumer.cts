import { hypergeometricPmf } from '@lp-labs/hypergeometric-distribution';
if (Math.abs(hypergeometricPmf(1, 4, 2, 2) - 2 / 3) > 1e-12) throw new Error('Probability');
// @ts-expect-error invalid argument must be rejected by declarations
hypergeometricPmf('1', 4, 2, 2);
