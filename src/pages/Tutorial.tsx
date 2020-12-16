import React, { useState } from 'react';
import { makeStyles } from '@material-ui/core/styles';
import Toolbar from '@material-ui/core/Toolbar';
import TutorialStepper from '@components/tutorial/tutorialStepper';

const useStyles = makeStyles(theme => ({
  root: {
    display: 'flex',
  },
  content: {
    flexGrow: 1,
    padding: theme.spacing(3),
    minHeight: '100%',
  },
}));

const Tutorial = () => {
  const classes = useStyles();

  return (
    <div className={classes.root}>
      <div className={classes.content}>
        <Toolbar />
        <TutorialStepper />
      </div>
    </div>
  );
};

export default Tutorial;
