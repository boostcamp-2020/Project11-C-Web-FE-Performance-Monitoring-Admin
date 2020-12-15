import React, { useContext } from 'react';
import { makeStyles } from '@material-ui/core/styles';
import CssBaseline from '@material-ui/core/CssBaseline';
import Toolbar from '@material-ui/core/Toolbar';
import LeftBar from '@components/common/LeftBar';
import MainContainer from '@components/Issues/detail/MainContainer';
import { PositionDispatchContext } from '../context/PositionProvider';

const useStyles = makeStyles(theme => ({
  root: {
    display: 'flex',
  },
  content: {
    flexGrow: 1,
    padding: theme.spacing(3),
  },
}));

const MainPage = ({ match }) => {
  const classes = useStyles();
  const { issueId } = match.params;

  const positionDispatch = useContext(PositionDispatchContext);

  positionDispatch({
    type: 'set',
    content: 'Issues',
    projectId: 'none',
  });

  return (
    <div className={classes.root}>
      <CssBaseline />
      <LeftBar />

      <main className={classes.content}>
        <Toolbar />
        <MainContainer issueId={issueId} />
      </main>
    </div>
  );
};

export default MainPage;
