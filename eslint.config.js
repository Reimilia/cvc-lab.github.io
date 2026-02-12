const js = require('@eslint/js')
const react = require('eslint-plugin-react')
const reactHooks = require('eslint-plugin-react-hooks')
const jsxA11y = require('eslint-plugin-jsx-a11y')
const babelParser = require('@babel/eslint-parser')

module.exports = [
  js.configs.recommended,
  {
    files: ['**/*.{js,jsx,ts,tsx}'],
    plugins: {
      react,
      'react-hooks': reactHooks,
      'jsx-a11y': jsxA11y,
    },
    languageOptions: {
      parser: babelParser,
      parserOptions: {
        ecmaVersion: 2020,
        sourceType: 'module',
        ecmaFeatures: {
          jsx: true,
        },
      },
      globals: {
        __PATH_PREFIX__: 'readonly',
        browser: true,
        node: true,
        es6: true,
        process: 'readonly',
        require: 'readonly',
        module: 'readonly',
        __dirname: 'readonly',
        exports: 'readonly',
        console: 'readonly',
        setTimeout: 'readonly',
        clearTimeout: 'readonly',
        setInterval: 'readonly',
        clearInterval: 'readonly',
        Promise: 'readonly',
        Buffer: 'readonly',
        global: 'readonly',
        window: 'readonly',
        document: 'readonly',
        navigator: 'readonly',
        fetch: 'readonly',
        localStorage: 'readonly',
        sessionStorage: 'readonly',
        HTMLElement: 'readonly',
        Event: 'readonly',
      },
    },
    settings: {
      react: {
        version: 'detect',
      },
    },
    rules: {
      'react/prop-types': 'off',
      'react/display-name': 'off',
      'jsx-a11y/anchor-is-valid': [
        'error',
        {
          components: ['Link'],
          specialLink: ['to'],
        },
      ],
      'no-console': ['warn', { allow: ['warn', 'error'] }],
      'no-unused-vars': ['error', { argsIgnorePattern: '^_' }],
      'react/jsx-uses-react': 'off',
      'react/react-in-jsx-scope': 'off',
      ...react.configs.recommended.rules,
      ...reactHooks.configs.recommended.rules,
      ...jsxA11y.configs.recommended.rules,
    },
  },
  {
    ignores: [
      'node_modules/',
      '.cache/',
      'public/',
      'static/',
      'build/',
      '*.min.js',
      'gatsby-browser.js',
      'gatsby-node.js',
      'gatsby-ssr.js',
      'gatsby-config.js',
      'jest.setup.js',
      'jest.config.js',
      '.babelrc',
      '__mocks__/**',
    ],
  },
]
