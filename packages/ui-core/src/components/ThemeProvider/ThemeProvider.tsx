import { useLayoutEffect } from 'react';
import type { ThemeProviderProps } from './types';
import { GlobalStyle } from './GlobalStyle';

export const ThemeProvider = ({ theme = 'basic-light', children }: ThemeProviderProps) => {
  // useLayoutEffect: 첫 페인트 전에 data-theme을 설정해 CSS 변수가 즉시 적용되도록 함
  useLayoutEffect(() => {
    const root = document.documentElement;
    root.setAttribute('data-theme', theme);
  }, [theme]);

  return (
    <>
      <GlobalStyle />
      {children}
    </>
  );
};
