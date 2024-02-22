import { useState, useEffect } from 'react';

function useTheme(defaultTheme: string) {
  const [theme, setTheme] = useState(
    localStorage.getItem('theme') || defaultTheme
  );

  useEffect(() => {
    localStorage.setItem('theme', theme);
    document.documentElement.setAttribute('data-theme', theme);
  }, [theme]);

  const toggleTheme = () => {
    const newTheme = theme === 'winter' ? 'dracula' : 'winter';
    setTheme(newTheme);
  };

  return { theme, toggleTheme };
}

export default useTheme;
