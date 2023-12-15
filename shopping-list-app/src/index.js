import React from 'react';
import ReactDOM from 'react-dom/client';
import './index.css';
import App from './App';
import { DarkModeProvider } from './DarkModeContext';
import reportWebVitals from './reportWebVitals';

const root = ReactDOM.createRoot(document.getElementById('root'));
root.render(
  <React.StrictMode>
    <DarkModeProvider> {/* Ensure this wraps App */}
      <App />
    </DarkModeProvider>
  </React.StrictMode>
);

reportWebVitals();
