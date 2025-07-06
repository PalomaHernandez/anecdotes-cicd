const js = require('@eslint/js');
const globals = require('globals');

module.exports = [
  js.configs.recommended,
  {
    files: ['**/*.{js,mjs,cjs}'],
    plugins: { js },
    rules: {
      semi: ['error', 'always'],
      'no-unused-vars': 'warn',
    },
    languageOptions: {
      ecmaVersion: 'latest',
      sourceType: 'commonjs',
      globals: {
        ...globals.node,
        ...globals.commonjs,
        ...globals.jest,
      },
    },
  },
  {
    ignores: ['public/*'],
  },
];
