// test/build.test.js — runs on Node's built-in test runner. No test framework.
const { test } = require('node:test');
const assert = require('node:assert');
const fs = require('fs');

const pages = fs.readdirSync('out').filter((f) => f.endsWith('.html'));

test('every source produced a page', () => {
  const sources = fs.readdirSync('src').filter((f) => f.endsWith('.md'));
  assert.strictEqual(pages.length, sources.length);
});

test('every page is real HTML and not raw Markdown', () => {
  for (const p of pages) {
    const html = fs.readFileSync('out/' + p, 'utf8');
    assert.match(html, /^<!doctype html>/);
    assert.doesNotMatch(html, /^# /m);
  }
});

test('no page is empty', () => {
  for (const p of pages) {
    const size = fs.statSync('out/' + p).size;
    assert.ok(size > 0, p + ' is empty (zero bytes)');
  }
});

test('every page names the course', () => {
  for (const p of pages) {
    assert.match(fs.readFileSync('out/' + p, 'utf8'), /DevOps/);
  }
});
