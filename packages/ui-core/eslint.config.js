import storybook from 'eslint-plugin-storybook';
import { createConfig } from '@ui-system/eslint-config';

const cwd = import.meta.dirname;
const tsconfigRoot = {
  files: ['**/*.{ts,tsx}'],
  languageOptions: {
    parserOptions: { tsconfigRootDir: cwd },
  },
};
export default [...createConfig({ cwd }), ...storybook.configs['flat/recommended'], tsconfigRoot];
