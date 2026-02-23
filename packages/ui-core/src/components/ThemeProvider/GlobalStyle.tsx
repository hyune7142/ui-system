import { createGlobalStyle } from 'styled-components';

export const GlobalStyle = createGlobalStyle`
  body {
    background-color: var(--palette-background-main);
    color: var(--palette-text-primary);
    transition: background-color 0.2s, color 0.2s;
    margin: 0;
    font-family: var(--typography-fontFamily);
  }
`;
