module.exports = {
  env: {
    node: true,
    es2022: true
  },
  extends: ['eslint:recommended'],
  parserOptions: {
    ecmaVersion: 'latest'
  },
  rules: {
    'no-eval': 'error',
    'no-implied-eval': 'error',
    'no-unused-vars': ['warn', { argsIgnorePattern: '^_' }]
  }
};