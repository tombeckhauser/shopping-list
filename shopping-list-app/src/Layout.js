// Layout.js
import React from 'react';
import { useDarkMode } from './DarkModeContext';

const Layout = ({ children }) => {
  const { darkMode } = useDarkMode();

  return <div className={darkMode ? 'dark-mode' : ''}>{children}</div>;
};

export default Layout;
