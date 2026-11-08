#!/usr/bin/env node
// tools/build.js — renders one Markdown source into one HTML page.
// Called by the Makefile: npm run build -- src/notes.md out/notes.html
const fs = require('fs');
const path = require('path');
const MarkdownIt = require('markdown-it');

const md = new MarkdownIt({ html: false, linkify: true, typographer: true });

// The part worth testing: Markdown text in, a complete HTML page out.
function renderPage(markdown, title) {
  return `<!doctype html>
<html lang="en">
<meta charset="utf-8">
<title>${title}</title>
${md.render(markdown)}</html>
`;
}

function main(argv) {
  const [src, dest] = argv;
  if (!src || !dest) {
    console.error('usage: build.js <source.md> <dest.html>');
    return 2;
  }
  const html = renderPage(fs.readFileSync(src, 'utf8'), path.basename(src, '.md'));
  fs.mkdirSync(path.dirname(dest), { recursive: true });
  fs.writeFileSync(dest, html);
  return 0;
}

module.exports = { renderPage, main };

if (require.main === module) {
  process.exitCode = main(process.argv.slice(2));
}
