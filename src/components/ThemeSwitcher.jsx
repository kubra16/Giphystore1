import React from 'react';
import { Button } from 'react-native';
import { useTheme } from '../context/ThemeContext';

const ThemeSwitcher = () => {
  const { toggleTheme } = useTheme();

  return (
    <Button title="Toggle Theme" onPress={toggleTheme} />
  );
};

export default ThemeSwitcher;
