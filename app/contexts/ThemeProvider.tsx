
/**
 * A provider component that wraps the app and provides theme data and functions 
 * for toggling between light and dark themes using the ThemeContext.
 * The `ThemeProvider` manages the current theme state and passes it down 
 * to the app via the `ThemeContext` and `StyledThemeProvider`.
 *
 * @component
 * @param {React.ReactNode} children - The children components to be rendered inside the provider.
 * @returns {JSX.Element} The `StyledThemeProvider` wrapped with the `ThemeContext.Provider` to provide theme data.
 *
 * @example
 * <ThemeProvider>
 *   <App />
 * </ThemeProvider>
 */

import React, { createContext, useState, useContext } from "react";
import { ThemeProvider as StyledThemeProvider } from "styled-components";
import { lightTheme, darkTheme, Theme } from "../constants/Themes";

/**
 * Context to provide theme and theme-related functions throughout the app.
 * It stores the current theme, allows toggling between light and dark modes, 
 * and tracks whether dark mode is enabled.
 *
 * @interface ThemeContextProps
 * @property {Theme} theme - The current theme object (light or dark theme).
 * @property {() => void} toggleTheme - Function to toggle between light and dark mode.
 * @property {boolean} isDarkMode - Boolean indicating if dark mode is currently active.
 */
interface ThemeContextProps {
  theme: Theme;
  toggleTheme: () => void;
  isDarkMode: boolean;}

const ThemeContext = createContext<ThemeContextProps | undefined>(undefined);

export const ThemeProvider: React.FC<{ children: React.ReactNode }> = ({
  children,
}) => {
  const [isDarkMode, setIsDarkMode] = useState(false);

  const toggleTheme = () => setIsDarkMode((prev) => !prev);

  const theme = isDarkMode ? darkTheme : lightTheme;

  return (
    <ThemeContext.Provider value={{ theme, toggleTheme, isDarkMode }}>
      <StyledThemeProvider theme={theme}>{children}</StyledThemeProvider>
    </ThemeContext.Provider>
  );
};

export const useTheme = (): ThemeContextProps => {
  const context = useContext(ThemeContext);
  if (!context) {
    throw new Error("useTheme must be used within a ThemeProvider");
  }
  return context;
};
