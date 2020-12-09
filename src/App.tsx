import React from 'react';
import { Route } from 'react-router-dom';
import Issues from './pages/Issues';
import Login from './pages/Login';
import GlobalStyle from './style/globalStyle';

const App: React.FC = () => {
  return (
    <div>
      <GlobalStyle />
      <Route path="/main" component={Issues} exact />
      <Route path="/" component={Login} exact />
    </div>
  );
};

export default App;
