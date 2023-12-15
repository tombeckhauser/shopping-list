import React from 'react';
import { useDarkMode } from './DarkModeContext';

const ToggleSwitch = () => {
  const { darkMode, toggleDarkMode } = useDarkMode();

  return (
    <label className="toggle-switch">
      <input type="checkbox" checked={darkMode} onChange={toggleDarkMode} />
      <span className="slider round"></span>
    </label>
  );
};

export default ToggleSwitch;