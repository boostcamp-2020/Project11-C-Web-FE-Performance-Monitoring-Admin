import React from 'react';
import { makeStyles } from '@material-ui/core/styles';
import CssBaseline from '@material-ui/core/CssBaseline';
import Toolbar from '@material-ui/core/Toolbar';
import LeftBar from '@components/Issues/LeftBar';
import MainContainer from '@components/Issues/MainContainer';

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

  return (
    <div className={classes.root}>
      <CssBaseline />

      <LeftBar />
      <main className={classes.content}>
        <Toolbar />
        <MainContainer projectId={match.params.projectId} />
      </main>
    </div>
  );
};

export default MainPage;
