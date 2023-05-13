import React from 'react';
import ReactDOM from 'react-dom/client';
import './index.css';
import App from './components/app/app.js';
import { rootReducer } from './services/reducers';
import thunk from 'redux-thunk'
import { createStore, applyMiddleware } from "redux";
import { Provider } from 'react-redux';
import { composeWithDevTools } from 'redux-devtools-extension';

const composeEnhancers = composeWithDevTools({});

const store = createStore(rootReducer, composeEnhancers(applyMiddleware(thunk)));


const root = ReactDOM.createRoot(
  document.getElementById('root') as HTMLElement
);
root.render(
  <Provider store={store}>
    <App />
  </Provider>
);