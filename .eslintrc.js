module.exports = {
  env: {
    browser: true,
    es6: true,
    node: true
  },
  settings: {
    react: {
      pragma: 'React',
      version: '16.9',
    },
  },
  extends: [
    'eslint:recommended',
    'plugin:react/recommended',
  ],
  globals: {
    Atomics: 'readonly',
    SharedArrayBuffer: 'readonly',
  },
  parserOptions: {
    ecmaFeatures: {
      jsx: true,
    },
    ecmaVersion: 2018,
    sourceType: 'module',
  },
  plugins: [
    'react',
  ],
  rules: {
  },
}