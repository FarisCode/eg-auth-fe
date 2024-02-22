import React from 'react';
import ReactDOM from 'react-dom/client';

import App from './App';
import MyContextProvider from './contexts/auth';

import 'semantic-ui-css/semantic.min.css'
import './index.css';

const root = ReactDOM.createRoot(
  document.getElementById('root') as HTMLElement
);
root.render(
  <React.StrictMode>
    <MyContextProvider>
      <App />
    </MyContextProvider>
  </React.StrictMode>
);