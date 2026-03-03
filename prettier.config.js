/** @type {import('prettier').Options} */
export default {
  printWidth: 100,
  singleQuote: true,
  trailingComma: 'all',
  tabWidth: 2,
  plugins: ['@ianvs/prettier-plugin-sort-imports'],
  importOrder: [
    '<BUILTIN_MODULES>',
    '',
    '<THIRD_PARTY_MODULES>',
    '',
    '^(?!.*[.]css$)src/(.*)$',
    '^(?!.*[.]css$)[./].*$',
    '',
    '[.]css$',
    '',
    '^config[.]json$',
  ],
};
