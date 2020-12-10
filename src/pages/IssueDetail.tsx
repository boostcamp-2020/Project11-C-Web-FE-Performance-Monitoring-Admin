import React from 'react';
import { makeStyles } from '@material-ui/core/styles';
import AppBar from '@material-ui/core/AppBar';
import CssBaseline from '@material-ui/core/CssBaseline';
import Toolbar from '@material-ui/core/Toolbar';

import Header from '@components/utils/Header';
import LeftBar from '@components/Issues/LeftBar';
import MainContainer from '@components/Issues/detail/MainContainer';

const useStyles = makeStyles(theme => ({
  root: {
    display: 'flex',
  },
  appBar: {
    zIndex: theme.zIndex.drawer + 1,
    backgroundColor: 'rgba(0,0,0,0.3)',
  },
  content: {
    flexGrow: 1,
    padding: theme.spacing(3),
  },
}));

const MainPage = ({ match }) => {
  const classes = useStyles();
  console.log(match);
  console.log(match.params);
  const { issueId } = match.params;
  console.log(issueId);
  return (
    <div className={classes.root}>
      <CssBaseline />
      <AppBar position="fixed" className={classes.appBar}>
        <Header />
      </AppBar>
      <LeftBar />

      <main className={classes.content}>
        <Toolbar />
        <MainContainer issueId={issueId} />
      </main>
    </div>
  );
};

export default MainPage;
