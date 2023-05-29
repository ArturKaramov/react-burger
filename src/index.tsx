import ReactDOM from 'react-dom/client';
import './index.css';
import App from './components/app/app';
import { Provider } from 'react-redux';
import { BrowserRouter } from 'react-router-dom';
import { store as initStore  } from './services/store';
import { StrictMode } from 'react';

const store = initStore();

const root = ReactDOM.createRoot(
  document.getElementById('root') as HTMLElement
);
root.render(
  <StrictMode>
    <Provider store={store}>
      <BrowserRouter>
        <App />
      </BrowserRouter> 
    </Provider>
  </StrictMode>
);