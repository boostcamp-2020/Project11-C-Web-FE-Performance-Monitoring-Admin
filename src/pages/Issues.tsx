import React, { useContext, useEffect, useState } from 'react';
import { makeStyles } from '@material-ui/core/styles';
import CssBaseline from '@material-ui/core/CssBaseline';
import Toolbar from '@material-ui/core/Toolbar';
import LeftBar from '@components/common/LeftBar';
import MainContainer from '@components/Issues/MainContainer';
import { PositionDispatchContext } from '../context/PositionProvider';
import { UserDispatchContext } from '../context/UserProvider';
import Api from '@utils/Api';

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
  const positionDispatch = useContext(PositionDispatchContext);
  const userDispatch = useContext(UserDispatchContext);

  positionDispatch({
    type: 'setPosition',
    content: 'Issues',
  });
  userDispatch({ type: 'recent', recent: match.params.projectId });

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
