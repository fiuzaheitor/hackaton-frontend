import React from 'react'
import ReactDOM from 'react-dom/client'
import './globals.scss'
import AppRoutes from './routes'

const rootElement = document.getElementById('root');

if (rootElement) {
  const root = ReactDOM.createRoot(rootElement as HTMLElement);
  root.render(
    <React.StrictMode>
      <AppRoutes />
    </React.StrictMode>
  );
}
