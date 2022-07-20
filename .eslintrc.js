module.exports = {
  root: true,
  parser: '@typescript-eslint/parser',
  plugins: ['@typescript-eslint', 'unused-imports', 'sort-imports-es6-autofix', 'prettier'],
  // prettier here overrides all eslint commands that it can do itself.
  extends: ['eslint:recommended', 'plugin:@typescript-eslint/eslint-recommended', 'plugin:@typescript-eslint/recommended', 'prettier'],
  parserOptions: {
    ecmaVersion: 2020,
    sourceType: 'module',
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
        singleQuote: true,
        printWidth: 225,
        arrowParens: 'avoid',
      },
      {
        usePrettierrc: false,
      },
    ],
    /**
     * define only code-related lint rules and leave formatting up to prettier
     */
    '@typescript-eslint/explicit-function-return-type': 'off',
    'no-tabs': ['error', { allowIndentationTabs: true }],
    '@typescript-eslint/no-angle-bracket-type-assertion': 'off',
    '@typescript-eslint/explicit-module-boundary-types': 'off',
    'no-useless-escape': 'off',
    '@typescript-eslint/no-unused-expressions': 'off',
    '@typescript-eslint/no-explicit-any': 'warn',
    'unused-imports/no-unused-imports': 'error',
    'sort-imports-es6-autofix/sort-imports-es6': [
      2,
      {
        ignoreCase: false,
        ignoreMemberSort: false,
        memberSyntaxSortOrder: ['none', 'all', 'multiple', 'single'],
      },
    ],
    '@typescript-eslint/no-var-requires': 'off',
    '@typescript-eslint/explicit-member-accessibility': 'off',
    'sort-imports': 'off',
    'require-atomic-updates': 'warn',
    'no-console': 'warn',
    '@typescript-eslint/ban-ts-comment': ['warn', { 'ts-ignore': false }],
    '@typescript-eslint/no-inferrable-types': [
      'off',
      {
        ignoreParameters: false,
        ignoreProperties: false,
      },
    ],
    '@typescript-eslint/prefer-for-of': 'error',
    '@typescript-eslint/consistent-type-assertions': [
      'error',
      {
        assertionStyle: 'as',
        objectLiteralTypeAssertions: 'allow-as-parameter',
      },
    ],
    '@typescript-eslint/no-empty-function': 'off',
    'no-bitwise': 'error',
    '@typescript-eslint/naming-convention': [
      'error',
      {
        selector: 'interface',
        format: ['PascalCase'],
        prefix: ['I'],
      },
    ],
    'prefer-const': 'error',
    'no-unused-vars': 'off', // to not interfere with @typescript just below
    '@typescript-eslint/no-unused-vars': ['error', { argsIgnorePattern: '[_].*' }],
    'no-prototype-builtins': 0,
    eqeqeq: 'error',
    'getter-return': 0,
    'linebreak-style': ['error', 'unix'],
  },
  overrides: [
    {
      files: ['*Service.ts', '*-service.ts'],
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
