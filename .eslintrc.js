module.exports = {
  root: true,
  parser: '@typescript-eslint/parser',
  plugins: ['@typescript-eslint', 'unused-imports', 'sort-imports-es6-autofix'],
  extends: ['eslint:recommended', 'plugin:@typescript-eslint/eslint-recommended', 'plugin:@typescript-eslint/recommended'],
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
    'no-tabs': ['error', { allowIndentationTabs: true }],
    '@typescript-eslint/explicit-function-return-type': 'off',
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
    'object-curly-spacing': ['error', 'always'],

    '@typescript-eslint/no-var-requires': 'off',
    '@typescript-eslint/explicit-member-accessibility': 'off',
    'max-len': 'off',
    'sort-imports': 'off',
    'require-atomic-updates': 'warn',
    'no-console': 'warn',
    '@typescript-eslint/ban-ts-comment': [
      'warn',
      {
        'ts-ignore': false,
      },
    ],
    '@typescript-eslint/no-inferrable-types': [
      'off',
      {
        ignoreParameters: false,
        ignoreProperties: false,
      },
    ],
    'keyword-spacing': 'error',
    'arrow-spacing': 'error',
    'key-spacing': [
      'error',
      {
        mode: 'minimum',
      },
    ],
    'semi-style': ['error', 'last'],
    'arrow-parens': ['error', 'as-needed'],
    'semi-spacing': 'error',
    'comma-spacing': 'error',
    'no-multi-spaces': 'error',
    'no-trailing-spaces': 'error',
    indent: 'off', // to not interfere with @typescript just below
    '@typescript-eslint/indent': ['error', 2],
    '@typescript-eslint/prefer-for-of': 'error',
    '@typescript-eslint/consistent-type-assertions': [
      'error',
      {
        assertionStyle: 'as',
        objectLiteralTypeAssertions: 'allow-as-parameter',
      },
    ],
    '@typescript-eslint/no-empty-function': 'off',
    'one-var': ['error', 'never'],
    'no-var': 'error',
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
    '@typescript-eslint/no-unused-vars': [
      'error',
      {
        argsIgnorePattern: '[_].*',
      },
    ],
    quotes: ['error', 'single'],
    'no-prototype-builtins': 0,
    'comma-dangle': ['error', 'always-multiline'],
    semi: ['error', 'always'],
    'eol-last': 'error',
    'no-multiple-empty-lines': [
      'error',
      {
        max: 1,
        maxEOF: 0,
        maxBOF: 0,
      },
    ],
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
