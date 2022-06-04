import React from 'react';
import ReactDOM from 'react-dom/client';
import App from './App';
import { ScoreProvider } from './contexts/ScoreContext';

const root = ReactDOM.createRoot(document.getElementById('root'));
root.render(
  <React.StrictMode>
    <ScoreProvider app={App}>
      <App />
    </ScoreProvider>
  </React.StrictMode>
);
