import React, { createContext, useContext, useEffect, useState } from 'react';

type Theme = 'light' | 'dark';

interface ThemeContextType {
  theme: Theme;
  toggleTheme: () => void;
  setTheme: (theme: Theme) => void;
}

const ThemeContext = createContext<ThemeContextType | undefined>(undefined);

export function ThemeProvider({ children }: { children: React.ReactNode }) {
  const [theme, setThemeState] = useState<Theme>('light'); // Default to light theme
  const [isInitialized, setIsInitialized] = useState(false);

  useEffect(() => {
    // Check for saved theme preference or default to light theme
    const savedTheme = localStorage.getItem('dental-theme') as Theme;
    if (savedTheme && (savedTheme === 'light' || savedTheme === 'dark')) {
      setThemeState(savedTheme);
    } else {
      // Default to light theme instead of system preference
      setThemeState('light');
    }
    setIsInitialized(true);
  }, []);

  useEffect(() => {
    if (!isInitialized) return;

    const root = document.documentElement;
    
    // Remove previous theme class
    root.classList.remove('light', 'dark');
    
    // Add new theme class
    root.classList.add(theme);
    
    // Apply theme with smooth transition
    if (theme === 'dark') {
      root.style.colorScheme = 'dark';
    } else {
      root.style.colorScheme = 'light';
    }
    
    // Save preference
    localStorage.setItem('dental-theme', theme);
    
    // Dispatch custom event for theme change
    window.dispatchEvent(new CustomEvent('themeChange', { detail: { theme } }));
  }, [theme, isInitialized]);

  const toggleTheme = () => {
    setThemeState(prev => prev === 'light' ? 'dark' : 'light');
  };

  const setTheme = (newTheme: Theme) => {
    setThemeState(newTheme);
  };

  // Listen for system theme changes
  useEffect(() => {
    const mediaQuery = window.matchMedia('(prefers-color-scheme: dark)');
    
    const handleChange = (e: MediaQueryListEvent) => {
      // Only update if no saved preference exists
      const savedTheme = localStorage.getItem('dental-theme');
      if (!savedTheme) {
        setThemeState(e.matches ? 'dark' : 'light');
      }
    };

    mediaQuery.addEventListener('change', handleChange);
    return () => mediaQuery.removeEventListener('change', handleChange);
  }, []);

  return (
    <ThemeContext.Provider value={{ theme, toggleTheme, setTheme }}>
      {children}
    </ThemeContext.Provider>
  );
}

export function useTheme() {
  const context = useContext(ThemeContext);
  if (context === undefined) {
    throw new Error('useTheme must be used within a ThemeProvider');
  }
  return context;
}