import React from 'react';
import { Route, Switch } from 'react-router-dom';
import Login from '@pages/Login';
import Projects from '@pages/Projects';
import ProjectNew from '@pages/ProjectNew';
import ProjectDetail from '@pages/ProjectDetail';
import Issues from '@pages/Issues';
import Header from '@components/utils/Header';
import GlobalStyle from './style/globalStyle';

const App: React.FC = () => {
  return (
    <>
      <GlobalStyle />
      {/* <Header /> */}
      <Route path="/" component={Login} exact />
      <Route path="/projects" component={Projects} exact />
      <Switch>
        <Route path="/projects/new" component={ProjectNew} exact />
        <Route path="/projects/:projectId" component={ProjectDetail} exact />
      </Switch>
      <Route path="/main" component={Issues} exact />
    </>
  );
};

export default App;
