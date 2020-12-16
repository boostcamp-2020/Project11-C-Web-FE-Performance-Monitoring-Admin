import React, { useState, useEffect, useContext } from 'react';
import axios from 'axios';
import Backdrop from '@material-ui/core/Backdrop';
import CircularProgress from '@material-ui/core/CircularProgress';
import { makeStyles } from '@material-ui/core/styles';

import Filter from './issue/Filter';
import TableColumn from './issue/TableColumn';
import ResolveProvider from '../../context/ResolveProvider';
import NoticeEmpty from '../common/NoticeEmpty';

const useStyles = makeStyles(theme => ({
  backdrop: {
    zIndex: theme.zIndex.drawer + 1,
    color: '#fff',
  },
  MainCotainer: {
    overflow: 'hidden',
  },
}));

const MainContainer = ({ projectId }) => {
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
        const response: any = await axios.get(
          `${process.env.API_URL}/issue/project/${projectId}`,
          {
            withCredentials: true,
          }
        );

        const checkBoxState: boolean[] = new Array(response.data.length + 1);
        checkBoxState.fill(false);

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
  if (issues.length === 0) {
    return (
      <div className={classes.MainCotainer}>
        <Filter eventNum={issues.length} projectId={projectId} />
        <NoticeEmpty type="issues" />
      </div>
    );
  }

  return (
    <div className={classes.MainCotainer}>
      <Filter eventNum={issues.length} projectId={projectId} />
      <ResolveProvider>
        <TableColumn issues={issues} />
      </ResolveProvider>
    </div>
  );
};

export default MainContainer;
