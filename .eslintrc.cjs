module.exports = {
  env: {
    'cypress/globals': true,
  },
  plugins: ['vue', 'prettier-vue', 'cypress'],
  globals: {
    describe: 'readonly',
    it: 'readonly',
  },
  extends: [
    'eslint:recommended',
    'plugin:vue/vue3-recommended',
    'plugin:prettier-vue/recommended',
    '@vue/eslint-config-typescript',
    '@vue/eslint-config-prettier',
  ],
};
