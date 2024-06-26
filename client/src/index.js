import React from 'react';
import { BrowserRouter, Link, Route, createBrowserRouter } from 'react-router-dom';
import ReactDOM from 'react-dom/client';
import App from './App';

import {store} from './app/store.js';
import { Provider } from 'react-redux'

const root = ReactDOM.createRoot(document.getElementById('root'));
root.render(
  <Provider store = {store}>
  <BrowserRouter>
    <App />
  </BrowserRouter>
  </Provider>
);