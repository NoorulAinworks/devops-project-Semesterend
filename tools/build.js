#!/usr/bin/env node
// tools/build.js — renders one Markdown source into one HTML page.
// Called by the Makefile:  npm run build -- src/notes.md out/notes.html
const fs = require('fs');
const path = require('path');
const MarkdownIt = require('markdown-it');

const [src, dest] = process.argv.slice(2);
if (!src || !dest) {
  console.error('usage: build.js <source.md> <dest.html>');
  process.exit(2);
}

const md = new MarkdownIt({ html: false, linkify: true, typographer: true });
const body = md.render(fs.readFileSync(src, 'utf8'));
const title = path.basename(src, '.md')
  .replace(/-/g, ' ')
  .replace(/\b\w/g, (c) => c.toUpperCase());

fs.mkdirSync(path.dirname(dest), { recursive: true });
fs.writeFileSync(dest, `<!doctype html>
<html lang="en">
<meta charset="utf-8">
<title>${title}</title>
${body}</html>
`);
