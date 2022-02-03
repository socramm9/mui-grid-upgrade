import React, { createContext, useContext, useEffect, useState } from "react";
import {} from "@material-ui/core/styles";
import { createTheme as createThemeV5 } from "@mui/material/styles";
import { createTheme as createThemeV4 } from "@material-ui/core";
import { ThemeProvider as ThemeProviderV5 } from "@mui/material/styles";
import {
  ThemeProvider as ThemeProviderV4,
  StylesProvider,
  createGenerateClassName,
} from "@material-ui/core/styles";

// const generateClassName = createGenerateClassName({
//   // By enabling this option, if you have non-MUI elements (e.g. `<div />`)
//   // using MUI classes (e.g. `.MuiButton`) they will lose styles.
//   // Make sure to convert them to use `styled()` or `<Box />` first.
//   disableGlobal: true,
//   // Class names will receive this seed to avoid name collisions.
//   seed: "mui-jss",
// });

export const lightThemeV4 = createThemeV4({
  palette: {
    type: "light",
    primary: {
      main: "rgb(15, 104, 53)",
    },
  },
});
export const darkThemeV4 = createThemeV4({
  palette: {
    type: "dark",
    primary: {
      main: "rgb(15, 104, 53)",
    },
  },
});
/* export const lightThemeV5 = createThemeV5({
  palette: {
    mode: "light",

    primary: {
      main: "rgb(15, 104, 53)",
    },
  },
});
export const darkThemeV5 = createThemeV5({
  palette: {
    mode: "dark",
    primary: {
      main: "rgb(15, 104, 53)",
    },
  },
}); */

export interface ThemeState {
  isDarkMode: boolean;
  toogleTheme?: () => void;
}

const defaultState: ThemeState = {
  isDarkMode: false,
};

export const useAppTheme = () => {
  return useContext(AppThemeContext);
};

export const AppThemeContext = createContext<ThemeState>(defaultState);

export const AppThemeProvider: React.FC = ({ children }) => {
  const [isDarkMode, setIsDarkMode] = useState(defaultState.isDarkMode);

  useEffect(function () {
    const isDark = window.localStorage.getItem("isDarkMode");
    if (isDark === "true") setIsDarkMode(true);
  }, []);

  const toogleTheme = () => {
    const value = !isDarkMode;
    window.localStorage.setItem("isDarkMode", value.toString());
    setIsDarkMode(value);
  };

  return (
    // <StylesProvider generateClassName={generateClassName}>
    <ThemeProviderV4 theme={isDarkMode ? darkThemeV4 : lightThemeV4}>
      {/* <ThemeProviderV5 theme={isDarkMode ? darkThemeV5 : lightThemeV5}> */}
      <AppThemeContext.Provider value={{ isDarkMode, toogleTheme }}>
        {children}
      </AppThemeContext.Provider>
      {/* </ThemeProviderV5> */}
    </ThemeProviderV4>
    // </StylesProvider>
  );
};
