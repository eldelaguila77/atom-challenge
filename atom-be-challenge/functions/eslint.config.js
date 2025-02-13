const typescriptParser = require('@typescript-eslint/parser');
const typescriptPlugin = require('@typescript-eslint/eslint-plugin');
const prettierConfig = require('eslint-config-prettier');

/** @type {import('eslint').Linter.FlatConfig} */ 
const config = [
  {
    languageOptions: {
      ecmaVersion: 2020,
      sourceType: 'module',
      globals: {
        es6: true,
        node: true,
      },
      parser: typescriptParser,
    },
    plugins: {
      '@typescript-eslint': typescriptPlugin,
    },
    rules: {
      // Puedes agregar tus reglas personalizadas aquí
    },
    files: ['*.ts', '*.js'],
  },
  {
    extends: ['eslint:recommended'],
  },
  {
    extends: ['plugin:@typescript-eslint/recommended'],
  },
  prettierConfig,
];

module.exports = config;