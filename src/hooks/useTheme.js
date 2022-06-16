import { useEffect, useState } from 'react';

const useTheme = () => {
  const [theme, setTheme] = useState('light');

  useEffect(() => {
    const localTheme = localStorage.getItem('theme');
    setTheme(localTheme || 'light');
  }, []);

  const toggleTheme = () => {
    if (theme === 'light') {
      setTheme('dark');
      localStorage.setItem('theme', 'dark');
    } else {
      setTheme('light');
      localStorage.setItem('theme', 'light');
    }
  };

  return [theme, toggleTheme];
};

export default useTheme;
