import React from 'react';
import { makeStyles } from '@material-ui/core/styles';
import AppBar from '@material-ui/core/AppBar';
import CssBaseline from '@material-ui/core/CssBaseline';
import Toolbar from '@material-ui/core/Toolbar';
import { PositionDispatchContext } from '../context/PositionProvider';

import Header from '@components/common/Header';
import LeftBar from '@components/common/LeftBar';
import AlertListTable from '@components/Alerts/AlertList';

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
  const positionDispatch = React.useContext(PositionDispatchContext);

  React.useEffect(() => {
    console.log(match.params.projectId);
    positionDispatch({
      type: 'setPosition',
      content: 'Alerts',
    });
  }, []);

  return (
    <div className={classes.root}>
      <CssBaseline />

      <LeftBar />
      <main className={classes.content}>
        <Toolbar />
        <AlertListTable />
      </main>
    </div>
  );
};

export default MainPage;
