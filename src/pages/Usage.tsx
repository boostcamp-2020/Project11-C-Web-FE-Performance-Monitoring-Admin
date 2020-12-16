import React, { useState } from 'react';
import { makeStyles } from '@material-ui/core/styles';
import DocsMain from '@components/docs/DocsMain';
import Toolbar from '@material-ui/core/Toolbar';
import LeftBar from '@components/common/LeftBar';

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
    minHeight: '100%',
  },
}));

const DocsPage = ({ match, location }) => {
  const classes = useStyles();
  const [dsn, setDsn] = useState(location.state?.dsn);

  return (
    <div className={classes.root}>
      <LeftBar />
      <div className={classes.content}>
        <Toolbar />
        <DocsMain platform={match.params.platform} dsn={dsn} />
      </div>
    </div>
  );
};

export default DocsPage;
