const eslintJs = require('@eslint/js')
const tsPlugin = require('@typescript-eslint/eslint-plugin')
const importPlugin = require('eslint-plugin-import')
const stylisticPlugin = require('@stylistic/eslint-plugin')

module.exports = [
  {
    ignores: [
      'node_modules',
      'dist',
      'bin/test',
    ],
  },
  eslintJs.configs.recommended,
  stylisticPlugin.configs.recommended,
  {
    plugins: {
      import: importPlugin,
    },
    rules: {
      ...importPlugin.configs.recommended.rules,
      ...importPlugin.configs.typescript.rules,
    },
    settings: importPlugin.configs.typescript.settings,
  },
  {
    files: ['**/*.ts', '**/*.tsx'],
    plugins: {
      '@typescript-eslint': tsPlugin,
    },
    rules: tsPlugin.configs.strict.rules,
  },
  {
    files: ['**/*.ts', '**/*.tsx', '**/*.js', '**/*.jsx'],
    plugins: {
      '@typescript-eslint': tsPlugin,
      '@stylistic': stylisticPlugin,
      'import': importPlugin,
    },
    languageOptions: {
      parser: require('@typescript-eslint/parser'),
      parserOptions: {
        project: './bin/tsconfig.json',
        extraFileExtensions: [],
        warnOnUnsupportedTypeScriptVersion: false,
      },
      ecmaVersion: 2020,
      sourceType: 'module',
      globals: {
        console: 'readonly',
        process: 'readonly',
        __dirname: 'readonly',
        __filename: 'readonly',
        module: 'readonly',
        require: 'readonly',
        exports: 'readonly',
        Buffer: 'readonly',
        setTimeout: 'readonly',
        clearTimeout: 'readonly',
        setInterval: 'readonly',
        clearInterval: 'readonly',
        setImmediate: 'readonly',
        clearImmediate: 'readonly',
      },
    },
    settings: {
      react: {
        version: '999.999.999',
      },
    },
    rules: {
      'import/no-unresolved': 'off',
      'no-unused-vars': 'off',
      'no-undef': 'off',
      'no-redeclare': 'off',
      'indent': 'off',
      'semi': 'off',
      '@stylistic/semi': ['error', 'never'],
      '@stylistic/indent': ['error', 2, { SwitchCase: 1 }],
      '@stylistic/member-delimiter-style': ['error', {
        multiline: { delimiter: 'none' },
        singleline: { delimiter: 'semi' },
      }],
      '@stylistic/no-multiple-empty-lines': ['error', { max: 1, maxEOF: 1, maxBOF: 0 }],
      '@stylistic/brace-style': ['error', '1tbs'],
      '@stylistic/quotes': ['error', 'single', { avoidEscape: true, allowTemplateLiterals: 'always' }],
      '@stylistic/no-extra-semi': 'error',
      '@stylistic/no-mixed-operators': 'off',
      '@stylistic/max-statements-per-line': 'off',
      '@stylistic/multiline-ternary': 'off',
      '@typescript-eslint/consistent-type-imports': 'error',
      '@typescript-eslint/no-unused-vars': ['error', {
        argsIgnorePattern: '^_', varsIgnorePattern: '^_',
      }],
      '@typescript-eslint/naming-convention': [
        'error',
        { selector: 'variable', format: ['camelCase', 'PascalCase', 'UPPER_CASE'], leadingUnderscore: 'allow' },
        { selector: 'parameter', format: ['camelCase'], leadingUnderscore: 'allow' },
        { selector: 'function', format: ['camelCase'], leadingUnderscore: 'forbid' },
        { selector: ['classProperty'], format: ['camelCase', 'UPPER_CASE'], leadingUnderscore: 'forbid' },
        { selector: ['classMethod'], format: ['camelCase'], leadingUnderscore: 'forbid' },
      ],
      '@typescript-eslint/no-explicit-any': 'off',
      '@typescript-eslint/no-empty-object-type': 'off',
      '@typescript-eslint/no-non-null-assertion': 'off',
      '@typescript-eslint/no-dynamic-delete': 'off',
      'arrow-parens': ['error', 'as-needed', { requireForBlockBody: true }],
      'object-curly-newline': ['error', { consistent: true }],
      'no-multiple-empty-lines': ['error', { max: 1, maxEOF: 1, maxBOF: 0 }],
      'require-await': 'warn',
      'no-empty': 'off',
      'no-fallthrough': 'off',
      'no-case-declarations': 'off',
    },
  },
  {
    files: ['**/*.test.ts'],
    rules: {
      'no-unused-expressions': 'off',
      '@typescript-eslint/no-unused-expressions': 'off',
    },
  },
]
