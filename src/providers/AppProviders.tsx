import { ThemeProvider } from "styled-components";
import { ToastInfoProvider } from "@hooks/useToastInfo";
import { SubMapProvider } from "@hooks/useSubMapsContext";
import { GlobalStyle } from "@styles/GlobalStyle";
import { theme } from "@styles/theme";
import { ModalProvider } from "@hooks/useModal";

type AppProvidersProps = {
  children: React.ReactNode;
};

const AppProviders: React.FC<AppProvidersProps> = ({ children }) => (
  <ThemeProvider theme={theme}>
    <GlobalStyle />
    <ToastInfoProvider>
      <ModalProvider>
        <SubMapProvider>{children}</SubMapProvider>
      </ModalProvider>
    </ToastInfoProvider>
  </ThemeProvider>
);

export { AppProviders };
