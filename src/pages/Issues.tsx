import React, { useContext, useEffect, useState } from 'react';
import { makeStyles } from '@material-ui/core/styles';
import CssBaseline from '@material-ui/core/CssBaseline';
import Toolbar from '@material-ui/core/Toolbar';
import LeftBar from '@components/common/LeftBar';
import MainContainer from '@components/Issues/MainContainer';
import { PositionDispatchContext } from '../context/PositionProvider';
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

  const [user, setUser] = useState(null);
  const [loading, setLoading] = useState(false);

  const readUserInfo = async () => {
    setLoading(true);
    const { data } = await Api.getUser();
    setLoading(false);
    setUser(data);

    positionDispatch({
      type: 'set',
      content: 'Issues',
      projectId: data.recentProject,
      userName: data.name,
      userEmail: data.email,
      imgUrl: data.imageURL,
    });
  };

  useEffect(() => {
    readUserInfo();
  }, []);

  if (loading) {
    return null;
  }

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
