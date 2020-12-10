import React, { useState, useEffect } from 'react';
import axios from 'axios';
import Backdrop from '@material-ui/core/Backdrop';
import CircularProgress from '@material-ui/core/CircularProgress';
import { makeStyles } from '@material-ui/core/styles';

import Filter from './issue/Filter';
import TableColumn from './issue/TableColumn';
import ResolveProvider from './issue/ResolveProvider';

const useStyles = makeStyles(theme => ({
  backdrop: {
    zIndex: theme.zIndex.drawer + 1,
    color: '#fff',
  },
  MainCotainer: {
    overflow: 'hidden',
  },
}));

const MainContainer = () => {
  const classes = useStyles();
  const [open, setOpen] = React.useState(true);

  const [issues, setIssues] = useState(null);
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState(null);

  useEffect(() => {
    const getIssues = async () => {
      try {
        setError(null);
        setIssues(null);

        setLoading(true);
        const response: any = await axios.get('http://localhost:3000/issue', {
          withCredentials: true,
        });

        const checkBoxState: boolean[] = new Array(response.data.length + 1);

        for (let index = 0; index < checkBoxState.length; index++) {
          checkBoxState[index] = false;
        }

        setIssues(response.data);
      } catch (e) {
        setError(e);
      }
      setLoading(false);
    };

    getIssues();
  }, []);

  if (loading) {
    return (
      <div>
        <Backdrop className={classes.backdrop} open={open}>
          <CircularProgress color="inherit" />
        </Backdrop>
      </div>
    );
  }
  if (error) return <div>에러가 발생했습니다</div>;
  if (!issues) return null;

  return (
    <div className={classes.MainCotainer}>
      <Filter eventNum={issues.length} projectId={issues[0].projectId} />
      <ResolveProvider>
        <TableColumn issues={issues} />
      </ResolveProvider>
    </div>
  );
};

export default MainContainer;
