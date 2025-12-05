// eslint.config.js

import js from '@eslint/js'
import globals from 'globals'
import tseslint from 'typescript-eslint'
import importPlugin from 'eslint-plugin-import'
import promisePlugin from 'eslint-plugin-promise'
import securityPlugin from 'eslint-plugin-security'

export default [
  // =======================
  // Base JS Rules (applied to TS also, but overridden below)
  // =======================
  {
    files: ['src/**/*.{js,ts}'],

    languageOptions: {
      ecmaVersion: 'latest',
      sourceType: 'module',
      globals: {
        ...globals.node,
      },
    },

    plugins: {
      import: importPlugin,
      promise: promisePlugin,
      security: securityPlugin,
    },

    rules: {
      // JS Recommended
      ...js.configs.recommended.rules,

      // Security rules
      ...securityPlugin.configs.recommended.rules,

      // General strict rules
      'no-unused-vars': 'error', // NOTE: will be turned off for TS below
      'no-undef': 'error',
      'no-console': ['warn', { allow: ['error', 'warn', 'info'] }],
      eqeqeq: ['error', 'always'],
      'prefer-const': 'error',

      // import ordering
      'import/order': [
        'error',
        {
          groups: [
            ['builtin', 'external'],
            ['internal'],
            ['parent', 'sibling', 'index'],
          ],
          'newlines-between': 'always',
          alphabetize: { order: 'asc', caseInsensitive: true },
        },
      ],

      // promises
      'promise/always-return': 'error',
      'promise/no-nesting': 'warn',
      'promise/no-return-wrap': 'error',
    },
  },

  // =======================
  // TypeScript Rules
  // =======================
  {
    files: ['src/**/*.{ts,js}'],

    languageOptions: {
      parser: tseslint.parser,
      parserOptions: {
        project: true, // uses tsconfig.json
      },
    },

    plugins: {
      '@typescript-eslint': tseslint.plugin,
    },

    rules: {
      // Turn OFF JS version for TS
      'no-unused-vars': 'off',

      // TS recommended + TS strict
      ...tseslint.configs.recommended.rules,
      ...tseslint.configs.strict.rules,

      // Allow _: _ , __ , ___ placeholders
      '@typescript-eslint/no-unused-vars': [
        'error',
        {
          varsIgnorePattern: '^_+$',
          argsIgnorePattern: '^_+$',
          caughtErrorsIgnorePattern: '^_+$',
        },
      ],

      '@typescript-eslint/consistent-type-imports': 'error',
      '@typescript-eslint/no-explicit-any': 'error',
      '@typescript-eslint/no-floating-promises': 'error',
      '@typescript-eslint/no-misused-promises': 'error',
    },
  },
]
