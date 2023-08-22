import React from 'react';
import ReactDOM from 'react-dom/client';
import './index.css';
import App from './App';
import { BrowserRouter } from 'react-router-dom';
import MouseCanvas from './pages/home/components/MouseCanvas';
import { Provider } from 'react-redux';
import store from './store';

const root = ReactDOM.createRoot(
  document.getElementById('root') as HTMLElement
);
root.render(
  <React.StrictMode>
    <Provider store={store}>
      <BrowserRouter>
        {/* <div style={{ position: 'relative', width: '100vw', height: '100vh' }}>
          <MouseCanvas></MouseCanvas> */}
          <App />
        {/* </div> */}
      </BrowserRouter>
    </Provider>
  </React.StrictMode>
);