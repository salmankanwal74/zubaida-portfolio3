import React, { createContext, useContext, useState } from 'react';

const ThemeContext = createContext();

export const themes = {
  dark: {
    bg: '#0A0E1A',
    bgSecondary: '#0F1628',
    bgCard: '#111827',
    text: '#F0F4FF',
    textMuted: '#8892A4',
    cyan: '#00D4FF',
    magenta: '#FF2D78',
    purple: '#7C3AED',
    green: '#00FF87',
    border: 'rgba(0,212,255,0.15)',
    gradient: 'linear-gradient(135deg, #00D4FF 0%, #FF2D78 100%)',
  },
  light: {
    bg: '#F0F4FF',
    bgSecondary: '#E8EDF8',
    bgCard: '#FFFFFF',
    text: '#0A0E1A',
    textMuted: '#4A5568',
    cyan: '#0099CC',
    magenta: '#CC1155',
    purple: '#5B21B6',
    green: '#059669',
    border: 'rgba(0,153,204,0.2)',
    gradient: 'linear-gradient(135deg, #0099CC 0%, #CC1155 100%)',
  }
};

export function ThemeProvider({ children }) {
  const [isDark, setIsDark] = useState(true);
  const theme = isDark ? themes.dark : themes.light;
  const toggleTheme = () => setIsDark(prev => !prev);

  return (
    <ThemeContext.Provider value={{ theme, isDark, toggleTheme }}>
      {children}
    </ThemeContext.Provider>
  );
}

export function useTheme() {
  return useContext(ThemeContext);
}