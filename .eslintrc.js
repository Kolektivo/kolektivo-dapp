module.exports = {
  root: true,
  parser: '@typescript-eslint/parser',
  plugins: ['@typescript-eslint', 'unused-imports', 'sort-imports-es6-autofix', 'prettier'],
  extends: [
    'eslint:recommended',
    'plugin:@typescript-eslint/recommended',
    'plugin:@typescript-eslint/recommended-requiring-type-checking',
    'plugin:@typescript-eslint/strict',
    'prettier'],
  parserOptions: {
    ecmaVersion: 2020,
    sourceType: 'module',
    project: ['tsconfig.json']
  },
  env: {
    es6: true,
    browser: true,
    node: true,
    jest: true,
  },
  rules: {
    'prettier/prettier': [
      'error',
      // these cannot be overridden by prettier, so must pull them in here explicitly from prettier
      {
        trailingComma: 'all',
        singleQuote: true,
        printWidth: 150,
      },
      {
        usePrettierrc: false,
      },
    ],
    'require-atomic-updates': 'warn',
    'no-console': 'warn',
    'unused-imports/no-unused-imports': 'error',
    'no-useless-escape': 'off',
    'no-tabs': ['error', { allowIndentationTabs: true }],
    '@typescript-eslint/consistent-type-definitions': 'off',
    '@typescript-eslint/no-base-to-string': [
      'error',
      {
        ignoredTypeNames: ['BigNumberish']
      }],
    '@typescript-eslint/explicit-function-return-type': 'off',
    '@typescript-eslint/no-angle-bracket-type-assertion': 'off',
    '@typescript-eslint/explicit-module-boundary-types': 'off',
    '@typescript-eslint/no-extraneous-class': 'off',
    '@typescript-eslint/indent': 'off',
    '@typescript-eslint/no-unused-vars': 'warn',
    '@typescript-eslint/no-unused-expressions': 'off',
    '@typescript-eslint/no-explicit-any': 'warn',
    '@typescript-eslint/ban-ts-comment': 'warn',
    '@typescript-eslint/naming-convention': [
      'error',
      {
        selector: 'interface',
        format: ['PascalCase'],
        prefix: ['I'],
      },
    ],
    'sort-imports-es6-autofix/sort-imports-es6': [
      2,
      {
        ignoreCase: false,
        ignoreMemberSort: false,
        memberSyntaxSortOrder: ['none', 'all', 'multiple', 'single'],
      },
    ],
    'object-curly-spacing': ['error', 'always'],
  },
  /**
   * require services to be explicit about public/private access
   */
  overrides: [
  {
    files: ['*-service.ts'],
    rules: {
      '@typescript-eslint/explicit-member-accessibility': [
        'error',
        {
          accessibility: 'explicit',
          overrides: {
            accessors: 'explicit',
            constructors: 'no-public',
            methods: 'explicit',
            properties: 'explicit',
            parameterProperties: 'explicit',
          },
        },
      ],
    },
  },
  ],
};
