import { StrictMode } from 'react';
import { createRoot } from 'react-dom/client';
import './index.css';
import App from './App.tsx';
import { BrowserRouter } from 'react-router';
import { AppProvider } from './contexts/app.context.tsx';
import ErrorBoundary from './components/ErrorBoundary/ErrorBoundary.tsx';
import { HelmetProvider } from 'react-helmet-async';

createRoot(document.getElementById('root')!).render(
  <BrowserRouter>
    <HelmetProvider>
      <StrictMode>
        <AppProvider>
          <ErrorBoundary>
            <App />
          </ErrorBoundary>
        </AppProvider>
      </StrictMode>
    </HelmetProvider>
  </BrowserRouter>
);
