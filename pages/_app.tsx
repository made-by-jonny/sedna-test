import React from "react";
import type { AppProps } from "next/app";
import { ThemeProvider } from "styled-components";
import * as theme from "../styles/theme";
import GlobalStyle from "../styles/globalStyle";

const MyApp = ({ Component, pageProps }: AppProps) => {
  return (
    <ThemeProvider theme={theme}>
      <>
        <GlobalStyle />
        <Component {...pageProps} />
      </>
    </ThemeProvider>
  );
};

export default MyApp;
