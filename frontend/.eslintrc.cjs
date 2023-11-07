module.exports = {
  env: {
    node: true,
  },
  parser: 'vue-eslint-parser',
  parserOptions: {
    ecmaVersion: 2022,
    parser: '@typescript-eslint/parser',
    sourceType: 'module',
  },
  plugins: ['@typescript-eslint'],
  extends: [
    'eslint:recommended',
    'plugin:vue/vue3-recommended',
    'prettier',
    'plugin:prettier/recommended',
    'plugin:import/recommended',
    'plugin:import/typescript',
  ],
  rules: {
    // override/add rules settings here, such as:
    'vue/no-unused-vars': 'warn',
    'import/prefer-default-export': 'off',
    // removes wrong unused warning on enums
    'no-unused-vars': 'off',
    '@typescript-eslint/no-unused-vars': 'warn',
    'vue/attribute-hyphenation': 'off',
    'vue/v-on-event-hyphenation': 'off',
    // remove Delete `␍` eslintprettier/prettier error
    'prettier/prettier': ['error', { endOfLine: 'auto' }],
  },
  settings: {
    'import/resolver': {
      alias: {
        map: [['@', './src']],
        extensions: ['.vue', '.js', '.ts'],
      },
    },
  },
};
