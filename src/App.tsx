import React from 'react';
import { Route, Switch } from 'react-router-dom';
import Login from '@pages/Login';
import Projects from '@pages/Projects';
import ProjectNew from '@pages/ProjectNew';
import ProjectDetail from '@pages/ProjectDetail';
import Usage from '@pages/Usage';
import Issues from '@pages/Issues';
import IssueDetail from '@pages/IssueDetail';
import Alerts from '@pages/Alerts';
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
          <Route path="/projects/new" component={ProjectNew} exact />
          <Route path="/projects/issues/:projectId" component={Issues} exact />
          <Route
            path="/projects/issues/detail/:issueId"
            component={IssueDetail}
            exact
          />
        </Switch>
        <Route path="/alerts" component={Alerts} exact />
        <Route path="/usage/:platform" component={Usage} exact />
      </PositionProvider>
      <Route path="/docs" component={DocsPage} exact />
      <Route path="/tutorial" component={Tutorial} exact />
    </>
  );
};

export default App;
