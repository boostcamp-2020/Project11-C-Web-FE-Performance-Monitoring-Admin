import React from 'react';
import { Route } from 'react-router-dom';
import Main from '@pages/Main';
import Login from '@pages/Login';
import GlobalStyle from '../style/globalStyle';

const App: React.FC = () => {
  return (
    <>
      <GlobalStyle />
      <Route path="/main" component={Main} exact />
      <Route path="/" component={Login} exact />
    </>
  );
};

export default App;
