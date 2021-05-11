import React from "react";
import { ThemeProvider } from "styled-components";
import * as theme from "../styles/theme";
import GlobalStyle from "../styles/globalStyle";

const MyApp = ({ Component, pageProps }) => {
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