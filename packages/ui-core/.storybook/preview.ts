import React from 'react';
import type { Preview } from '@storybook/react-vite';
import { ThemeProvider } from '../src/components/ThemeProvider';
import type { Theme } from '../src/components/ThemeProvider/types';

import '../src/styles/basic/base.css';
import '../src/styles/basic/light.css';
import '../src/styles/basic/dark.css';

const preview: Preview = {
  decorators: [
    (Story, context) => {
      const theme = (context.globals?.theme as Theme) ?? 'basic-light';
      return React.createElement(ThemeProvider, {
        theme,
        children: React.createElement(Story),
      });
    },
  ],
  globalTypes: {
    theme: {
      name: 'Theme',
      description: 'Global theme for components',
      defaultValue: 'basic-light',
      toolbar: {
        icon: 'paintbrush',
        items: [
          { value: 'basic-light', title: 'Basic Light' },
          { value: 'basic-dark', title: 'Basic Dark' },
        ],
        dynamicTitle: true,
      },
    },
  },
  parameters: {
    controls: {
      matchers: {
        color: /(background|color)$/i,
        date: /Date$/i,
      },
    },
    a11y: {
      // 'todo' - show a11y violations in the test UI only
      // 'error' - fail CI on a11y violations
      // 'off' - skip a11y checks entirely
      test: 'todo',
    },
  },
};

export default preview;
