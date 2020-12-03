import React from 'react';
import { BrowserRouter, Route } from 'react-router-dom';
import Projects from './pages/Projects';
import Login from './pages/Login';
import GlobalStyle from './style/globalStyle';

const App: React.FC = () => {
  return (
    <BrowserRouter>
      <GlobalStyle />
      <Route path="/projects" component={Projects} exact />
      <Route path="/" component={Login} exact />
    </BrowserRouter>
  );
};

export default App;
