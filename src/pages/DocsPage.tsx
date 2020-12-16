import React, { useState } from 'react';
import { makeStyles } from '@material-ui/core/styles';
import PlatformNav from '@components/docs/nav/PlatformNav';
import DocsMain from '@components/docs/DocsMain';
import Toolbar from '@material-ui/core/Toolbar';

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

const DocsPage = () => {
  const classes = useStyles();
  const [platform, setPlatform] = useState('Node');

  return (
    <div className={classes.root}>
      <PlatformNav platform={platform} setPlatform={setPlatform} />
      <div className={classes.content}>
        <Toolbar />
        <DocsMain platform={platform} dsn={null} />
      </div>
    </div>
  );
};

export default DocsPage;
