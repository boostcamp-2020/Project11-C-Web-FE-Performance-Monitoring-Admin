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
import AppBar from '@material-ui/core/AppBar';
import { makeStyles } from '@material-ui/core/styles';

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
