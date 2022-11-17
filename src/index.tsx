import React from 'react';
import ReactDOM from 'react-dom/client';
import App from './components/app/app';
import { store } from './store';
import { Provider } from 'react-redux';
import browserHistory from './browser-history';
import HistoryRoute from './components/history-route/history-route';

const root = ReactDOM.createRoot(
  document.getElementById('root') as HTMLElement,
);

root.render(
  <React.StrictMode>
    <Provider
      store={store}
    >
      <HistoryRoute history={browserHistory}>
        <App />
      </HistoryRoute>
    </Provider>
  </React.StrictMode>,
);
