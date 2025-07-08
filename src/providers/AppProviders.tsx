import { ThemeProvider } from 'styled-components';
import { ToastInfoProvider } from '@hooks/useToastInfo';
import { GlobalStyle } from '@styles/GlobalStyle';
import { theme } from '@styles/theme';

type AppProvidersProps = {
  children: React.ReactNode;
}

const AppProviders: React.FC<AppProvidersProps> = ({ children }) => (
  <ThemeProvider theme={theme}>
    <GlobalStyle />
    <ToastInfoProvider>
      {children}
    </ToastInfoProvider>
  </ThemeProvider>
);

export { AppProviders };
