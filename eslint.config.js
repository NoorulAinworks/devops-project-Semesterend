// eslint.config.js — ESLint's recommended rules, for Node (CommonJS) code.
const js = require('@eslint/js');
const globals = require('globals');

module.exports = [
  { ignores: ['out/', 'coverage/', 'node_modules/'] },
  js.configs.recommended,
  { languageOptions: { sourceType: 'commonjs', globals: globals.node } },
];
