import React, { createContext, useContext, useState } from 'react';
import { DarkColors, LightColors } from '../utils/theme';

const ThemeContext = createContext({
  colors: DarkColors,
  isDark: true,
  toggleTheme: () => {},
});

export const ThemeProvider = ({ children }) => {
  const [isDark, setIsDark] = useState(true);

  const toggleTheme = () => setIsDark(prev => !prev);

  const value = {
    colors: isDark ? DarkColors : LightColors,
    isDark,
    toggleTheme,
  };

  return (
    <ThemeContext.Provider value={value}>
      {children}
    </ThemeContext.Provider>
  );
};

export const useTheme = () => useContext(ThemeContext);

export default ThemeContext;
