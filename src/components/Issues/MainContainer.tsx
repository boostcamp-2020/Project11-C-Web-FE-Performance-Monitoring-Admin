import React, { useState, useEffect } from 'react';
import axios from 'axios';
import Backdrop from '@material-ui/core/Backdrop';
import CircularProgress from '@material-ui/core/CircularProgress';
import { makeStyles } from '@material-ui/core/styles';

import Filter from './issue/Filter';
import TableColumn from './issue/TableColumn';
import IssueItem from './issue/IssueItem';

const useStyles = makeStyles(theme => ({
  backdrop: {
    zIndex: theme.zIndex.drawer + 1,
    color: '#fff',
  },
}));

const MainContainer = () => {
  const classes = useStyles();
  const [open, setOpen] = React.useState(true);

  const [issues, setIssues] = useState(null);
  const [errorEvents, setErrorEvents] = useState(null);
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState(null);

  useEffect(() => {
    const fetchUsers = async () => {
      try {
        setError(null);
        setIssues(null);

        setLoading(true);
        const respone: any = await axios.get('http://localhost:3000/issue', {
          withCredentials: true,
        });

        setIssues(respone.data);
      } catch (e) {
        setError(e);
      }
      setLoading(false);
    };

    fetchUsers();
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
    <div>
      <Filter eventNum={issues.length} />
      <TableColumn />
      {issues.map(issue => (
        <IssueItem
          key={issue._id}
          issueId={issue._id}
          name={issue.name}
          description={issue.message}
          eventNum={issue.errorEvents.length}
          userNum={issue.users}
          assigned={issue.assigned}
          errorEvents={issue.errorEvents}
          stack={issue.stack}
          date={issue.createdAt}
        />
      ))}
    </div>
  );
};

export default MainContainer;
