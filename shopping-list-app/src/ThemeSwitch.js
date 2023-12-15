// src/ThemeSwitch.js
import React, { useState, useEffect } from 'react';

const ThemeSwitch = () => {
  const [darkTheme, setDarkTheme] = useState(false);

  useEffect(() => {
    document.documentElement.setAttribute('data-theme', darkTheme ? 'dark' : 'light');
  }, [darkTheme]);

  const handleThemeChange = (e) => {
    setDarkTheme(e.target.checked);
  };

  return (
    <label className="theme-switch">
      <input type="checkbox" onChange={handleThemeChange} checked={darkTheme} />
      Toggle Dark Mode
    </label>
  );
};

export default ThemeSwitch;