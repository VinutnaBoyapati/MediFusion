import React from 'react';
import ReactDOM from 'react-dom/client';
import './index.css';
import App from './App';
import reportWebVitals from './reportWebVitals';
import './index.css';

// Ensure the root element is non-null and properly typed
const rootElement = document.getElementById('root') as HTMLElement; // Type assertion

if (rootElement) {
  const root = ReactDOM.createRoot(rootElement);
  root.render(
    <React.StrictMode>
      <App />
    </React.StrictMode>
  );
} else {
  console.error("Root element not found.");
}

// Performance measurement function
reportWebVitals();
