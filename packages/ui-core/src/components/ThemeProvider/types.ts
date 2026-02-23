export type Theme = 'basic-light' | 'basic-dark' | 'custom-light' | 'custom-dark';

export interface ThemeProviderProps {
  theme?: Theme;
  children: React.ReactNode;
}
