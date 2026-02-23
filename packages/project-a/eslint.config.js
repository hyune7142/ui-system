import { createConfig } from '@ui-system/eslint-config';

const cwd = import.meta.dirname;
export default [
  ...createConfig({ cwd }),
  {
    files: ['**/*.{ts,tsx}'],
    languageOptions: {
      parserOptions: { tsconfigRootDir: cwd },
    },
  },
];
