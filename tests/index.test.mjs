import assert from 'node:assert/strict';
import test from 'node:test';
import * as api from '../dist/esm/index.js';
test('analytic fixture', () => {
  assert.ok(Math.abs(api.hypergeometricPmf(1, 4, 2, 2) - 2 / 3) < 1e-12);
});
test('support', () => {
  assert.equal(api.hypergeometricPmf(3, 4, 2, 2), 0);
  assert.equal(api.hypergeometricPmf(0, 4, 2, 0), 1);
});
test('normalization', () => {
  for (let n = 2; n < 30; n++) {
    let sum = 0;
    for (let k = 0; k <= n; k++)
      sum += api.hypergeometricPmf(k, n, Math.floor(n / 2), Math.floor(n / 3));
    assert.ok(Math.abs(sum - 1) < 1e-12);
  }
});
test('moments', () => {
  assert.deepEqual(api.hypergeometricMoments(1, 1, 1), { mean: 1, variance: 0 });
});
test('invalid population', () => {
  assert.throws(() => api.hypergeometricPmf(0, 0, 0, 0));
  assert.throws(() => api.hypergeometricPmf(0, 4, 5, 2));
});
test('types and nonfinite', () => {
  assert.throws(() => api.hypergeometricPmf('1', 4, 2, 2));
});
