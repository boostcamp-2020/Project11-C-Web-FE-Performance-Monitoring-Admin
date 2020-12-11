import React from 'react';
import ReactDOM from 'react-dom';
import { BrowserRouter, Route } from 'react-router-dom';
import App from './App';
import Test from './Test';

ReactDOM.render(
  <BrowserRouter>
    <App />
    <Route path="/test" component={Test} exact />
  </BrowserRouter>,
  document.getElementById('root')
);
