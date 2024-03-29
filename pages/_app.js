import React, { useEffect } from "react";
import PropTypes from "prop-types";
import "styles/animation.scss";
import "styles/common.scss";
import { Provider } from "react-redux";
import { useStore } from "redux/store";
import Head from "next/head";
import { ThemeProvider } from "@material-ui/core/styles";
import theme from "components/theme";
import { CssBaseline } from "@material-ui/core";
import { DONATE_ID, FLASH_EFFECT } from "utils/Constant";

export default function MyApp({ Component, pageProps }) {
  const store = useStore(pageProps.initialReduxState);
  useEffect(() => {
    // Remove the server-side injected CSS.
    const jssStyles = document.querySelector("#jss-server-side");
    if (jssStyles) {
      jssStyles.parentElement.removeChild(jssStyles);
    }
    const body = document.querySelector("#next-body")
    if (body) {
      body.style.backgroundColor = theme.palette.background.main
    }
    // Add animation for Donate-BTN:
    const donate = document.getElementById(DONATE_ID);
    if (donate) donate.classList && donate.classList.add(FLASH_EFFECT);
  }, []);
  return (
    <React.Fragment>
      <Head>
        <title>NEKO-KUN</title>
        <meta
          name="viewport"
          content="minimum-scale=1, initial-scale=1, width=device-width"
        />
      </Head>
      <ThemeProvider theme={theme}>
        {/* CssBaseline kickstart an elegant, consistent, and simple baseline to build upon. */}
        <CssBaseline />
        <Provider store={store}>
          <Component {...pageProps} />
        </Provider>
      </ThemeProvider>
    </React.Fragment>
  );
}

MyApp.propTypes = {
  Component: PropTypes.elementType.isRequired,
  pageProps: PropTypes.object.isRequired,
};
