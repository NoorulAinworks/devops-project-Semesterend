const { test } = require('node:test');
const assert = require('node:assert');
const { isDuplicate } = require('../tools/duplicates');

test('pages with different titles are not duplicates', () => {
  assert.strictEqual(isDuplicate({ title: 'a' }, { title: 'b' }), false);
});

test('pages with the same title are duplicates', () => {
  assert.strictEqual(isDuplicate({ title: 'a' }, { title: 'a' }), true);
});
