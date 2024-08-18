import js from '@eslint/js'
import globals from 'globals'
import prettierPlugin from 'eslint-plugin-prettier'
import prettierConfig from 'eslint-config-prettier'
import StylisticPlugin from '@stylistic/eslint-plugin'
import reactHooks from 'eslint-plugin-react-hooks'
import reactRefresh from 'eslint-plugin-react-refresh'
import tseslint from 'typescript-eslint'

export default tseslint.config(
  { ignores: ['dist'] },
  StylisticPlugin.configs['disable-legacy'],
  {
    extends: [
      js.configs.recommended,
      ...tseslint.configs.recommended,
      StylisticPlugin.configs['recommended-flat'],
    ],
    files: ['**/*.{ts,tsx}'],
    languageOptions: {
      ecmaVersion: 2020,
      globals: globals.browser,
    },
    plugins: {
      'react-hooks': reactHooks,
      'react-refresh': reactRefresh,
      prettier: prettierPlugin,
      '@stylistic': StylisticPlugin,
    },
    rules: {
      ...reactHooks.configs.recommended.rules,
      'react-refresh/only-export-components': [
        'warn',
        { allowConstantExport: true },
      ],
      '@stylistic/jsx-one-expression-per-line': 'off',
      '@stylistic/brace-style': 'off',
      '@stylistic/member-delimiter-style': [
        'error',
        { overrides: { interface: { multiline: { delimiter: 'semi' } } } },
      ],
    },
  },
)
