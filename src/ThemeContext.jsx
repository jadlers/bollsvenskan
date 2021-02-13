import React, { createContext, useEffect, useState } from "react";
import useStoredSetting from "./hooks/useStoredSetting";

const ThemeContext = createContext();

const ThemeContextProvider = ({ children }) => {
  const [storedTheme, setStoredTheme] = useStoredSetting("theme");
  const initialTheme =
    storedTheme !== null
      ? storedTheme
      : window.matchMedia("(prefers-color-scheme: dark)").matches
      ? "dark"
      : "light";
  const [theme, setTheme] = useState(initialTheme);
  const toggleTheme = () => {
    const nextTheme = theme === "dark" ? "light" : "dark";
    setStoredTheme(nextTheme); // User clicked to change theme, store their choice
    setTheme(nextTheme);
  };

  return (
    <ThemeContext.Provider
      value={{
        theme,
        toggleTheme,
      }}
    >
      {children}
    </ThemeContext.Provider>
  );
};

export { ThemeContext, ThemeContextProvider };
