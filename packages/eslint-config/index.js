import js from '@eslint/js';
import globals from 'globals';
import reactHooks from 'eslint-plugin-react-hooks';
import reactRefresh from 'eslint-plugin-react-refresh';
import tseslint from 'typescript-eslint';
import eslintConfigPrettier from 'eslint-config-prettier';

/**
 * 공통 ESLint flat config 생성
 * @param {Object} options
 * @param {string} [options.cwd=process.cwd()] - tsconfigRootDir로 사용할 경로 (패키지 루트)
 * @returns {import('eslint').Linter.FlatConfig[]}
 */
export function createConfig(options = {}) {
  const { cwd = process.cwd() } = options;

  const spread = x => (Array.isArray(x) ? x : [x]);
  return [
    { ignores: ['**/dist/**', '**/node_modules/**', '**/.storybook/**'] },
    {
      // `typescript-eslint` parser can be selected for JS config files too.
      // In monorepos, VSCode ESLint may lint from the workspace root and fail to
      // infer a single tsconfig root unless this is set for all parsed files.
      languageOptions: {
        parserOptions: {
          tsconfigRootDir: cwd,
        },
      },
    },
    ...spread(js.configs.recommended),
    ...spread(tseslint.configs.recommended),
    ...spread(reactHooks.configs.flat.recommended),
    ...spread(reactRefresh.configs.vite),
    ...spread(eslintConfigPrettier),
    {
      files: ['**/*.{ts,tsx}'],
      languageOptions: {
        ecmaVersion: 2020,
        globals: globals.browser,
        parserOptions: {
          tsconfigRootDir: cwd,
        },
      },
    },
    {
      files: ['**/scripts/**/*.js'],
      languageOptions: {
        ecmaVersion: 2020,
        globals: globals.node,
      },
    },
  ];
}

export default createConfig;
