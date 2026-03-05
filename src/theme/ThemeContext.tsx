import React, { createContext, useContext, useEffect, useState } from 'react';
import { useColorScheme as useDeviceColorScheme, Platform, Appearance } from 'react-native';

type ThemeMode = 'light' | 'dark' | 'system';

interface ThemeContextType {
  theme: 'light' | 'dark';
  themeMode: ThemeMode;
  setThemeMode: (mode: ThemeMode) => void;
  toggleTheme: () => void;
}

let storage: any;
if (Platform.OS === 'web') {
  storage = {
    getString: (key: string) => localStorage.getItem(key),
    set: (key: string, value: string) => localStorage.setItem(key, value),
  };
} else {
  const { MMKV } = require('react-native-mmkv');
  storage = new MMKV();
}

const ThemeContext = createContext<ThemeContextType | undefined>(undefined);

export const ThemeProvider: React.FC<{ children: React.ReactNode }> = ({ children }) => {
  const deviceTheme = useDeviceColorScheme() || 'light';
  const [themeMode, setThemeMode] = useState<ThemeMode>('system');

  useEffect(() => {
    const saved = storage.getString('themeMode');
    if (saved && (saved === 'light' || saved === 'dark' || saved === 'system')) {
      setThemeMode(saved);
    }
  }, []);

  // Listen to system theme changes
  useEffect(() => {
    const subscription = Appearance.addChangeListener(({ colorScheme }) => {
      // Force re-render when system theme changes
      setThemeMode((prev) => prev); // trigger update
    });
    return () => subscription.remove();
  }, []);

  const theme = themeMode === 'system' ? deviceTheme : themeMode;

  const handleSetThemeMode = (mode: ThemeMode) => {
    setThemeMode(mode);
    storage.set('themeMode', mode);
  };

  const toggleTheme = () => {
    const newMode = theme === 'light' ? 'dark' : 'light';
    handleSetThemeMode(newMode);
  };

  return (
    <ThemeContext.Provider value={{ theme, themeMode, setThemeMode: handleSetThemeMode, toggleTheme }}>
      {children}
    </ThemeContext.Provider>
  );
};

export const useTheme = () => {
  const context = useContext(ThemeContext);
  if (!context) throw new Error('useTheme must be used within ThemeProvider');
  return context;
};
