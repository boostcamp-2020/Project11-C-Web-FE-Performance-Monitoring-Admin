import React from 'react';
import ReactDOM from 'react-dom';
import { BrowserRouter, Route } from 'react-router-dom';

import Login from '@pages/Login';
import App from './App';

ReactDOM.render(
  <BrowserRouter>
    <Route path="/main" component={App} exact />
    <Route path="/" component={Login} exact />
  </BrowserRouter>,
  document.getElementById('root')
);
