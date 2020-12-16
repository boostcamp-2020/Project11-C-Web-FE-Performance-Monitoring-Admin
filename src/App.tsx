import React from 'react';
import { Route, Switch } from 'react-router-dom';
import Login from '@pages/Login';
import Projects from '@pages/Projects';
import ProjectNew from '@pages/ProjectNew';
import Usage from '@pages/Usage';
import Issues from '@pages/Issues';
import IssueDetail from '@pages/IssueDetail';
import Alerts from '@pages/Alerts';
import Stats from '@pages/Stats';
import GlobalStyle from './style/globalStyle';
import Header from '@components/common/Header';
import AppBar from '@material-ui/core/AppBar';

import { makeStyles } from '@material-ui/core/styles';
import DocsPage from '@pages/DocsPage';
import Tutorial from '@pages/Tutorial';
import PositionProvider from './context/PositionProvider';

const useStyles = makeStyles(theme => ({
  appBar: {
    zIndex: theme.zIndex.drawer + 1,
    backgroundColor: 'rgba(0,0,0,0.3)',
  },
}));

const App: React.FC = () => {
  const classes = useStyles();
  return (
    <>
      <GlobalStyle />
      <AppBar position="fixed" className={classes.appBar}>
        <Header />
      </AppBar>
      <Route path="/" component={Login} exact />
      <PositionProvider>
        <Route path="/projects" component={Projects} exact />
        <Switch>
          <Route path="/usage/:platform" component={Usage} exact />
          <Route path="/projects/new" component={ProjectNew} exact />
          <Route path="/projects/issues/:projectId" component={Issues} exact />
          <Route
            path="/projects/issues/detail/:issueId"
            component={IssueDetail}
            exact
          />
          <Route path="/projects/:projectId/stats" component={Stats} exact />
        </Switch>
        <Route path="/alerts" component={Alerts} exact />
      </PositionProvider>
      <Route path="/docs" component={DocsPage} exact />
    </>
  );
};

export default App;
