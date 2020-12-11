import React from 'react';
import { Route, Switch } from 'react-router-dom';
import Login from '@pages/Login';
import Projects from '@pages/Projects';
import ProjectNew from '@pages/ProjectNew';
import ProjectDetail from '@pages/ProjectDetail';
import Usage from '@pages/Usage';
import Issues from '@pages/Issues';
import IssueDetail from '@pages/IssueDetail';
import GlobalStyle from './style/globalStyle';
import Header from './components/utils/Header';

const App: React.FC = () => {
  return (
    <>
      <GlobalStyle />
      <Header />
      <Route path="/" component={Login} exact />
      <Route path="/projects" component={Projects} exact />
      <Switch>
        <Route path="/projects/new" component={ProjectNew} exact />
        <Route path="/projects/:projectId" component={Issues} exact />
      </Switch>
      <Route path="/issues" component={Issues} exact />
      <Route path="/issues/:issueId" component={IssueDetail} />
      <Route path="/usage/:platform" component={Usage} exact />
    </>
  );
};

export default App;
