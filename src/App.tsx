import React from 'react';
import { Route, Switch } from 'react-router-dom';
import Login from '@pages/Login';
import Projects from '@pages/Projects';
import ProjectNew from '@pages/ProjectNew';
import ProjectDetail from '@pages/ProjectDetail';
import GlobalStyle from './style/globalStyle';

const App: React.FC = () => {
  return (
    <>
      <GlobalStyle />
      <Route path="/" component={Login} exact />
      <Route path="/projects" component={Projects} exact />
      <Switch>
        <Route path="/projects/new" component={ProjectNew} exact />
        <Route path="/projects/:projectId" component={ProjectDetail} exact />
      </Switch>
    </>
  );
};

export default App;
